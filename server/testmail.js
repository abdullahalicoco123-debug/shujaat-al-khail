require("dotenv").config();
const nodemailer = require("nodemailer");

console.log("EMAIL_USER is:", process.env.EMAIL_USER);
console.log("EMAIL_PASS length is:", process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : "MISSING");
console.log("EMAIL_TO is:", process.env.EMAIL_TO);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

transporter.verify((err) => {
  if (err) {
    console.log("LOGIN FAILED:", err.message);
  } else {
    console.log("LOGIN OK — credentials are correct!");
  }
});