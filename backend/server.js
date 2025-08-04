import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
// route imports
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
// database imports
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// configurations
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Important for cookies since you're using authentication
  })
);
app.use(express.json()); // parser of the body of the requests
app.use(cookieParser()); // cookie parser method
// routes
app.use("/api/auth", authRoutes); // authentication route // the endpoint is handled by the authRoutes file
app.use("/api/products", productRoutes); // product route // the endpoint is handled by the productRoutes file
app.use("/api/cart", cartRoutes); // cart route // the endpoint is handled by the cartRoutes file
app.use("/api/coupons", couponRoutes); // coupon route // the endpoint is handled by the couponRoutes file
app.use("/api/payments", paymentRoutes); // payment route // the endpoint is handled by the paymentRoutes file
app.use("/api/analytics", analyticsRoutes); // analytics route // the endpoint is handled by the analyticsRoutes file

// server
app.listen(PORT, () => {
  console.log("[ SERVER IS RUNNING AT http://localhost:" + PORT + " ]");
  connectDB();
});
