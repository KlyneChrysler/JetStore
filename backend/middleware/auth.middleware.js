import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// productRoute function for middleware
export const protectRotute = async (req, res, next) => {
  try {
    // now get the accessToken from the database using req and parse is with cookieparser and put it on the accessToken var
    const accessToken = req.cookies.accessToken;
    // if accessToken is null then get feedback
    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized! No access token provided" });
    }

    try {
      // it verifies the accessToken using the token secret key and returns the formatted or formatted datas'
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      // now find the id in the decoded variable and remove the password and put it on the user var
      const user = await User.findById(decoded.userId).select("-password");
      // if user is null then get feedback
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      // if user is found then put it on request so other parts can use it
      req.user = user;
      // then move to the next function
      next();
    } catch (error) {
      // if error name is same as tokenexpirederror than return response
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Unauthorized! Access token expired" });
      }
      // then throw it to the catch
      throw error;
    }
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    return res
      .status(401)
      .json({ message: "Unauthorized! Invalid access token" });
  }
};

export const adminRoute = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied! Admin only" });
  }
};
