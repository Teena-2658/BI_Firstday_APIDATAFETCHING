const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("./product.model");
// const authMiddleware = require("../auth/auth.middleware");

/* -------------------- MULTER CONFIG -------------------- */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const unique =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* =========================================================
   CREATE PRODUCT
   URL => POST /api/products
========================================================= */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price } = req.body;

    const product = await Product.create({
      name,
      price,
      image: req.file ? req.file.path : null,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================================================
   GET ALL PRODUCTS
   URL => GET /api/products
========================================================= */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================================================
   UPDATE PRODUCT
   URL => PUT /api/products/:id
========================================================= */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      price: req.body.price,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================================================
   DELETE PRODUCT
   URL => DELETE /api/products/:id
========================================================= */
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
