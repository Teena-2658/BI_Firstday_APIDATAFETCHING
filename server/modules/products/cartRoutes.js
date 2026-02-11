const express = require("express");
const router = express.Router();

const Cart = require("../../common/models/Cart");
const authMiddleware = require("../auth/auth.middleware");


// ✅ ADD TO CART
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { product } = req.body;

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({
        userId: req.user.id,
        items: [
          {
            productId: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: 1,
          },
        ],
      });
    } else {
      const exist = cart.items.find(
        item => item.productId === product.id
      );

      if (exist) {
        exist.quantity += 1;
      } else {
        cart.items.push({
          productId: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
        });
      }
    }

    await cart.save();
    res.json(cart);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ GET CART
router.get("/", authMiddleware, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  res.json(cart);
});


// ✅ DELETE ITEM
router.delete("/:id", authMiddleware, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });

  cart.items = cart.items.filter(
    item => item.productId !== req.params.id
  );

  await cart.save();
  res.json(cart);
});

module.exports = router;
