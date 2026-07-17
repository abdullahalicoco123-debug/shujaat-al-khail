const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    nameEn: {
      type: String,
      required: true,
    },
    nameAr: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);