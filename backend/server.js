import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// authentication
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("[ SERVER IS RUNNING AT http://localhost:" + PORT + " ]");
});
