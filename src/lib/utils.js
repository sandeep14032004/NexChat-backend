import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";

export const generateToken = (userid, res) => {
  const token = jwt.sign({ userid }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
};

export const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

export const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"<${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🔐 Your OTP Code for NexChat",
    html: `
  <div style="max-width: 600px; margin: auto; padding: 40px 30px; background: linear-gradient(135deg, #f8fafc, #eef2ff); border-radius: 16px; font-family: 'Segoe UI', 'Roboto', sans-serif; color: #1e293b; box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);">
  
  <!-- Header / Branding -->
  <div style="text-align: center;">
    <h1 style="font-size: 28px; color: #4f46e5; margin-bottom: 4px;">NexChat Verification</h1>
    <p style="font-size: 15px; color: #475569;">Your gateway to secure conversations.</p>
  </div>

  <!-- OTP Code -->
  <div style="margin-top: 32px; text-align: center;">
    <p style="font-size: 16px; margin-bottom: 12px;">Please enter this one-time password to verify your email:</p>
    <div style="
      font-size: 36px;
      font-weight: bold;
      letter-spacing: 8px;
      padding: 16px 24px;
      border-radius: 12px;
      background: #ffffff;
      color: #4f46e5;
      display: inline-block;
      box-shadow: 0 4px 20px rgba(79, 70, 229, 0.4);
      animation: pop 0.5s ease-in-out;
    ">
      ${otp}
    </div>
    <p style="font-size: 14px; color: #64748b; margin-top: 12px;">This code will expire in <strong>5 minutes</strong>.</p>
  </div>

  <!-- Quote -->
  <div style="margin-top: 40px; font-style: italic; text-align: center; color: #334155;">
    <p>"In a world full of noise, security is the silence you deserve."</p>
  </div>

  <!-- Footer -->
  <div style="margin-top: 48px; text-align: center; font-size: 12px; color: #94a3b8;">
    If you didn’t request this email, you can safely ignore it.
    <br /><br />
    — With 💙 from Team NexChat
    <br /><br />
    © ${new Date().getFullYear()} NexChat. All rights reserved.
  </div>

  <!-- Embedded Animations -->
  <style>
    @keyframes pop {
      0% { transform: scale(0.85); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }
  </style>
</div>

`,
    text: `Your OTP code is ${otp}. It is valid for 5 minutes. Do not share it with anyone.`,
  };

  await transporter.sendMail(mailOptions);
};
