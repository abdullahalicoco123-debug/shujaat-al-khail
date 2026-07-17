const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getProducts,
  getProductById,
  createProduct,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, createProduct);

module.exports = router;