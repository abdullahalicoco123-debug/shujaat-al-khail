const Category = require("../models/Category");

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create a new category
const createCategory = async (req, res) => {
  try {
    const { nameEn, nameAr, slug, image } = req.body;

    const category = new Category({
      nameEn,
      nameAr,
      slug,
      image,
    });

    const savedCategory = await category.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCategories,
  createCategory,
};