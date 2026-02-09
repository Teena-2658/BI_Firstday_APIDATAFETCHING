const express = require("express");
const router = express.Router();
const auth = require("../auth/auth.middleware");

router.get("/", auth, async (req, res) => {
  res.json([]); // replace with DB logic
});

router.post("/", auth, async (req, res) => {
  res.json({ message: "Product added" });
});

router.put("/:id", auth, async (req, res) => {
  res.json({ message: "Product updated" });
});

router.delete("/:id", auth, async (req, res) => {
  res.json({ message: "Product deleted" });
});

module.exports = router;
