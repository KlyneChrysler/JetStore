import { redis } from "../lib/redis.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Tokens function
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

// Store RefreshToken function
const storeRefreshToken = async (userId, refreshToken) => {
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
  const { email, password, name } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "[ USER ALREADY EXISTS ]" });
    }
    const user = await User.create({ name, email, password });

    // authenticate the user
    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);

    // cookies
    setCookies(res, accessToken, refreshToken);

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "[ USER CREATED SUCCESSFULLY ]",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  res.send("[ LOGIN ROUTE CALLED ]");
};

// Logout function
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      // delete refresh token from the redis
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      await redis.del(`refresh_token:${decoded.userId}`);
    }
    // Clear from the cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "[ LOGGED OUT SUCESSFULLY ]" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
