const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // ✅ removed required
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false, // ✅ allow product without image also
    },
     vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
