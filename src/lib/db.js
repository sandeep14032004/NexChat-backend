import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB = async () => {};
try {
  const conn = await mongoose.connect(process.env.MONGODB_URI);
  console.log("Database Connected " + process.env.MONGODB_URI);
} catch (error) {
  console.log(error);
}
