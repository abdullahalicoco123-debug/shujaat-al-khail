const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  registerAdmin,
  loginAdmin,
  forgotPassword,
  resetPassword,
} = require("../controllers/adminController");

router.post("/register", protect, registerAdmin);
router.post("/login", loginAdmin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;