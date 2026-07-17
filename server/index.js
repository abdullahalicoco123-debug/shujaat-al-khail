require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Shuja'at Al-Khail server is running!");
});

const categoryRoutes = require("./routes/categoryRoutes");
app.use("/api/categories", categoryRoutes);
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });