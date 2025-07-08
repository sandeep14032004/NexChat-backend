import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  fullName: { type: String, required: true }, // ✅ Add this
  password: { type: String, required: true }, // ✅ And this
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, expires: 300 },
});

const Otp = mongoose.model("Otp", otpSchema);
export default Otp;
