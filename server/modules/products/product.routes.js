const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("./product.model");
const authMiddleware = require("../auth/auth.middleware");

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
router.post(
  "/",
  upload.single("image"),
  authMiddleware,
  async (req, res) => {
    try {
      const { name, price } = req.body;

      const product = await Product.create({
        user: req.user.id || req.user._id,
        name,
        price,
        image: req.file ? req.file.path : null,
      });

      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/* -------------------- READ -------------------- */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const products = await Product.find({
      user: req.user.id || req.user._id,
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------- UPDATE -------------------- */
router.put(
  "/:id",
  upload.single("image"),
  authMiddleware,
  async (req, res) => {
    try {
      const updateData = {
        name: req.body.name,
        price: req.body.price,
      };

      if (req.file) updateData.image = req.file.path;

      const product = await Product.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id || req.user._id },
        updateData,
        { new: true }
      );

      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/* -------------------- DELETE -------------------- */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Product.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id || req.user._id,
    });

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
