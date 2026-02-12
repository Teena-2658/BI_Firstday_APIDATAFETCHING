import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    title: String,
    price: Number,
    thumbnail: String,
    source: String,
  },
  { timestamps: true }
);

export default mongoose.model("Wishlist", wishlistSchema);
