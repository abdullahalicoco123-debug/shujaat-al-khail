const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { upload } = require("../config/cloudinary");

router.post("/", protect, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }
  res.json({ url: req.file.path });
});

module.exports = router;