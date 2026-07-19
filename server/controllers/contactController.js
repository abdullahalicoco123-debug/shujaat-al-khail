const nodemailer = require("nodemailer");

const sendContactMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
      return res.status(503).json({
        message: "Email delivery is not configured. Please contact the site administrator.",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Shuja'at Al-Khail Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `New message from ${name} — Website Contact Form`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\n\nMessage:\n${message}`,
    });

    res.json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact email failed:", error.message);
    if (error.code === "EAUTH") {
      return res.status(503).json({
        message: "Email delivery is not configured correctly. Please contact the site administrator.",
      });
    }

    res.status(500).json({ message: "Could not send message. Please try again." });
  }
};

module.exports = { sendContactMessage };
