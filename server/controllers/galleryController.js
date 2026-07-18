const Gallery = require("../models/Gallery");

// Get all gallery images (public)
const getGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a gallery image (admin)
const addGalleryImage = async (req, res) => {
  try {
    const { image, title } = req.body;
    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }
    const newImage = new Gallery({ image, title });
    const saved = await newImage.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a gallery image (admin)
const deleteGalleryImage = async (req, res) => {
  try {
    const image = await Gallery.findByIdAndDelete(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getGalleryImages, addGalleryImage, deleteGalleryImage };