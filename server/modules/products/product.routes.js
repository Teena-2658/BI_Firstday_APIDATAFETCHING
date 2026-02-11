const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("./product.model");
const verifyToken = require('../auth/auth.middleware');


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

router.post(
  "/",
  verifyToken,                 // 🔥 ADD THIS
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, price } = req.body;

      const product = await Product.create({
        name,
        price,
        image: req.file ? req.file.path : null,
        vendor: req.user.id   // 🔥 ADD THIS LINE
      });

      res.status(201).json({
        message: "Product created successfully",
        product,
      });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/* =========================================================
   GET ALL PRODUCTS
   URL => GET /api/products
========================================================= */
router.get("/", verifyToken, async (req, res) => {
  try {
    const products = await Product.find({
      vendor: req.user.id   // 🔥 only this vendor's products
    }).sort({ createdAt: -1 });

    res.json(products);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* =========================================================
   UPDATE PRODUCT
   URL => PUT /api/products/:id
========================================================= */
router.put("/:id", verifyToken, upload.single("image"), async (req, res) => {
  try {

    const product = await Product.findOne({
      _id: req.params.id,
      vendor: req.user.id   // 🔥 ensure ownership
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.name = req.body.name;
    product.price = req.body.price;

    if (req.file) {
      product.image = req.file.path;
    }

    await product.save();

    res.json(product);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* =========================================================
   DELETE PRODUCT
   URL => DELETE /api/products/:id
========================================================= */
router.delete("/:id", verifyToken, async (req, res) => {
  try {

    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      vendor: req.user.id   // 🔥 ownership check
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
