const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getGalleryImages,
  addGalleryImage,
  deleteGalleryImage,
} = require("../controllers/galleryController");

router.get("/", getGalleryImages);
router.post("/", protect, addGalleryImage);
router.delete("/:id", protect, deleteGalleryImage);

module.exports = router;