import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // connect to the database using my mongodb pass and store it to the conn var
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`[ MongoDB CONNECTED: ${conn.connection.host} ]`);
  } catch (error) {
    console.log("[ ERROR CONNECTING TO MongoDB ]", error.message);
    process.exit(1); // failure
  }
};
