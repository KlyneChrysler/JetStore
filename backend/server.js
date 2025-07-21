import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// route imports
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
// database imports
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// configurations
app.use(express.json()); // parser of the body of the requests
app.use(cookieParser()); // cookie parser method
// routes
app.use("/api/auth", authRoutes); // authentication route // the endpoint is handled by the authRoutes file
app.use("/api/products", productRoutes); // product route // the endpoint is handled by the productRoute file

app.listen(PORT, () => {
  console.log("[ SERVER IS RUNNING AT http://localhost:" + PORT + " ]");
  connectDB();
});
