const express = require("express");
const verifyToken = require("../auth/auth.middleware");
const Wishlist = require("../../common/models/wishlist.model.js");

const router = express.Router();

/* ==============================
   ADD TO WISHLIST
============================== */
router.post("/", verifyToken, async (req, res) => {
  try {
    const existing = await Wishlist.findOne({
      user: req.user.id,
      productId: req.body.id,
    });

    if (existing) {
      return res.json({ message: "Already in wishlist" });
    }

    const item = await Wishlist.create({
      user: req.user.id,
      productId: req.body.id,
      title: req.body.title,
      price: req.body.price,
      thumbnail: req.body.thumbnail,
      source: req.body.source,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==============================
   GET WISHLIST
============================== */
router.get("/", verifyToken, async (req, res) => {
  try {
    const items = await Wishlist.find({ user: req.user.id });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==============================
   REMOVE FROM WISHLIST
============================== */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Wishlist.findOneAndDelete({
      user: req.user.id,
      productId: req.params.id,
    });

    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
