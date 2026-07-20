const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Register a new admin (protected — only an existing admin can add members)
const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Step 1 — request a reset link
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Always the same reply, so nobody can discover which emails exist
    const genericResponse = {
      message: "If that email is registered, a reset link has been sent.",
    };

    const admin = await Admin.findOne({ email });
    if (!admin) return res.json(genericResponse);

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    admin.resetToken = hashedToken;
    admin.resetTokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour
    await admin.save();

    const resetLink = `${process.env.CLIENT_URL}/admin/reset-password/${rawToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Shuja'at Al-Khail Admin" <${process.env.EMAIL_USER}>`,
      to: admin.email,
      subject: "Reset your admin password",
      text: `You requested a password reset for the Shuja'at Al-Khail admin panel.

Open this link to set a new password (valid for 1 hour):
${resetLink}

If you did not request this, you can ignore this email — your password will not change.`,
    });

    res.json(genericResponse);
  } catch (error) {
    res.status(500).json({ message: "Could not process the request." });
  }
};

// Step 2 — set the new password
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: "Token and new password are required" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const admin = await Admin.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({ message: "This reset link is invalid or has expired." });
    }

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);
    admin.resetToken = null;
    admin.resetTokenExpiry = null;
    await admin.save();

    res.json({ message: "Password updated successfully. You can now log in." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  forgotPassword,
  resetPassword,
};