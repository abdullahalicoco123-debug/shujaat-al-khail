const Order = require("../models/Order");
const Product = require("../models/Product");

// Create order (public — guest checkout)
const createOrder = async (req, res) => {
  try {
    const { customerName, customerPhone, customerEmail, address, city, notes, items } = req.body;

    if (!customerName || !customerPhone || !address || !city || !items || items.length === 0) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // Build items from the DATABASE prices (never trust prices sent by the browser)
    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product || typeof product.price !== "number") continue;
      const quantity = Number(item.quantity) || 1;

      orderItems.push({
        product: product._id,
        nameEn: product.nameEn,
        nameAr: product.nameAr,
        price: product.price,
        quantity,
        image: product.images && product.images.length > 0 ? product.images[0] : "",
      });
      totalAmount += product.price * quantity;
    }

    if (orderItems.length === 0) {
      return res.status(400).json({ message: "No valid items in order" });
    }

    const order = new Order({
      customerName,
      customerPhone,
      customerEmail,
      address,
      city,
      notes,
      items: orderItems,
      totalAmount,
    });

    const saved = await order.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (admin only)
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status (admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createOrder, getOrders, updateOrderStatus };
