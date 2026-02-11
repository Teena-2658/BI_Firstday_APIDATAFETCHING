const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    role: {
    type: String,
    enum: ["customer", "vendor"],
    default: "customer",
  },
  },
  {
    timestamps: true   // 👈 createdAt, updatedAt auto
  }
);

module.exports = mongoose.model("User", userSchema);
