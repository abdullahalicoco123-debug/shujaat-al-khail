const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { createOrder, getOrders, updateOrderStatus } = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/", protect, getOrders);
router.put("/:id", protect, updateOrderStatus);

module.exports = router;