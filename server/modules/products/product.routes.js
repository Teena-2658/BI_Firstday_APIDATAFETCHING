const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("./product.model");
const auth = require("../auth/auth.middleware");

/* -------------------- MULTER -------------------- */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* -------------------- CREATE -------------------- */
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image required" });
    }

    const product = await Product.create({
      user: req.user._id,
      name,
      price,
      image: req.file.path,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------- READ -------------------- */
router.get("/", auth, async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------- UPDATE -------------------- */
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      price: req.body.price,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updateData,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------- DELETE -------------------- */
router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
