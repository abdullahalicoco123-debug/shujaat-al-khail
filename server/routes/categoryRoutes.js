const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getCategories,
  createCategory,
} = require("../controllers/categoryController");

router.get("/", getCategories);
router.post("/", protect, createCategory);

module.exports = router;