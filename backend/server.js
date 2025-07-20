import express from "express";
import dotenv from "dotenv";
// route imports
import authRoutes from "./routes/authRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// authentication
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("[ SERVER IS RUNNING AT http://localhost:" + PORT + " ]");
});
