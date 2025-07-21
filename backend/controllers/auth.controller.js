import { redis } from "../lib/redis.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Tokens function
const generateTokens = (userId) => {
  // This line creates a JWT access token that includes the user ID, signs it using the secret key from the environment, and sets it to expire in 15 minutes.
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  // This line creates a JWT access token that includes the user ID, signs it using the secret key from the environment, and sets it to expire in 7 days.
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

// Store RefreshToken function
// for the paramater i took it from the refreshToken var in the generateToken
const storeRefreshToken = async (userId, refreshToken) => {
  // now put the refreshToken into the redis with a format and expiration data
  await redis.set(
    `refresh_token:${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60 // 7 days
  );
};

// Set Cookies function
const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true, // to prevent XSS attacks or cross site scripting attacks
    secure: process.env.NODE_ENV === "production", // only gonna be true in the production to use https for security
    sameSite: "strict", // to prevent CSRF attacks or cross-site request forgery
    maxAge: 15 * 60 * 1000, // expires in 15 minutes
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // to prevent XSS attacks or cross site scripting attacks
    secure: process.env.NODE_ENV === "production", // only gonna be true in the production to use https for security
    sameSite: "strict", // to prevent CSRF attacks or cross-site request forgery
    maxAge: 7 * 24 * 60 * 60 * 1000, // expires in 7 days
  });
};

// Sign up function
export const signup = async (req, res) => {
  // requested email, password and name from the database using express req.body
  const { email, password, name } = req.body;
  try {
    // if the email exist in the database put it on the userExists var
    const userExists = await User.findOne({ email });
    // if userExists is not null its true so run the if logic
    if (userExists) {
      // return status 400 or will not proceed to process the clients req and a info res
      return res.status(400).json({ message: "User already exist" });
    }
    // now use mongoose create method to create the user and store it to the user var
    const user = await User.create({ name, email, password });

    // authenticate the user and generate tokens for access and refresh
    const { accessToken, refreshToken } = generateTokens(user._id);
    // now please wait to store the refreshToken to the redis that has the userId and token
    await storeRefreshToken(user._id, refreshToken);

    // now set cookies for the new user
    setCookies(res, accessToken, refreshToken);

    // now send a res that contains the following except the password
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "User created successfully",
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Login function
export const login = async (req, res) => {
  try {
    // req email and password from the database
    const { email, password } = req.body;
    // now find the user in the database that has that email then put it to the user variable
    const user = await User.findOne({ email });

    // if the user is found please wait for logic to compare the users' password for authentication, if fail then skip if
    if (user && (await user.comparePassword(password))) {
      // now generate tokens to store in accessToken and refreshToken
      const { accessToken, refreshToken } = generateTokens(user._id);
      // now this will take time, so please wait to store the refreshToken alongwith userId to the redis data storage
      await storeRefreshToken(user._id, refreshToken);
      // now set cookies for this account
      setCookies(res, accessToken, refreshToken);
      // get the res in json format
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      // now if the user inputs wrong email or password it will show this
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Logout function
export const logout = async (req, res) => {
  try {
    // used cookie parser for the cookies. and get the refreshToken from redis and store it on the refreshToken var
    const refreshToken = req.cookies.refreshToken;
    // if refreshToken is not null then proceed on logic
    if (refreshToken) {
      // used verify function to decode the token and put it in the decoded var
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      // delete refresh token from the redis
      await redis.del(`refresh_token:${decoded.userId}`);
    }
    // Clear from the cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//this will refresh the access token
export const refreshToken = async (req, res) => {
  try {
    // now get the refreshToken from the database using req and parse is with cookieparser and put it on the refreshToken var
    const refreshToken = req.cookies.refreshToken;
    // if refreshToken is null then get feedback
    if (!refreshToken) {
      return res.status(491).json({ message: "No refresh token provided" });
    }
    // This line verifies the refresh token using the secret key and returns the decoded payload (such as the user ID) if the token is valid.
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    // now get the formatted refreshToken from redis using get and store it at the storedToken var
    const storedToken = await redis.get(`refresh_token:${decoded.userId}`);
    // if storedToken is not equals to refreshToken then res feedback
    if (storedToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    // now generate new accessToken and put it on the accessToken var
    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    // now put the accessToken var in the cookies and set the cookie using res.cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true, // to prevent XSS attacks or cross site scripting attacks
      secure: process.env.NODE_ENV === "production", // only gonna be true in the production to use https for security
      sameSite: "strict", // to prevent CSRF attacks or cross-site request forgery
      maxAge: 15 * 60 * 1000, // expires in 15 minutes
    });

    res.json({ message: "Token refreshed successfully" });
  } catch (error) {
    console.log("Error in refreshToken controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// TODO: implement getProfile later
// export const getProfile = async (req, res) => {};
