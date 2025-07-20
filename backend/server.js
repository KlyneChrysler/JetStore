import express from "express";
import dotenv from "dotenv";
// route imports
import authRoutes from "./routes/authRoute.js";
// database imports
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// configurations
app.use(express.json()); // parser of the body of the requests
app.use("/api/auth", authRoutes); // authentication route

app.listen(PORT, () => {
  console.log("[ SERVER IS RUNNING AT http://localhost:" + PORT + " ]");
  connectDB();
});
