const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nameEn: {
      type: String,
      required: true,
    },
    nameAr: {
      type: String,
      required: true,
    },
    descriptionEn: {
      type: String,
      default: "",
    },
    descriptionAr: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
      default: null,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    colors: {
      type: [String],
      default: [],
    },
    sizes: {
      type: [String],
      default: [],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    badge: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;