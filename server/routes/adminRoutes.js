const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { registerAdmin, loginAdmin } = require("../controllers/adminController");

router.post("/register", protect, registerAdmin);
router.post("/login", loginAdmin);

module.exports = router;