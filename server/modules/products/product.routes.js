const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("./product.model");
const verifyToken = require("../auth/auth.middleware");

/* ================= MULTER ================= */

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
========================================================= */

router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    if (req.user.role !== "vendor") {
      return res.status(403).json({ error: "Only vendors can create products" });
    }

    const { name, price, status } = req.body;

    const product = await Product.create({
      name,
      price,
      status: status || "published",
      image: req.file ? req.file.path : null,
      vendor: req.user.id,
    });

    res.status(201).json(product);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================================================
   GET PRODUCTS
========================================================= */

router.get("/", verifyToken, async (req, res) => {
  try {
    let products;

    if (req.user.role === "vendor") {
      // Vendor sees ONLY his own products
      products = await Product.find({ vendor: req.user.id })
        .sort({ createdAt: -1 });
    } else {
      // Customer sees only published products
      products = await Product.find({ status: "published" })
        .sort({ createdAt: -1 });
    }

    res.json(products);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================================================
   UPDATE PRODUCT (Owner Only)
========================================================= */

router.put("/:id", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      vendor: req.user.id,
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.status = req.body.status || product.status;

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
   DELETE PRODUCT (Owner Only)
========================================================= */

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      vendor: req.user.id,
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
