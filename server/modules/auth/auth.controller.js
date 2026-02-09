// const bcrypt = require('bcryptjs');
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import User from '../../common/models/user.model.js';
//   In-memory users array for demonstration
// const users = []; // In real apps, use a database

// Register user
const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashed });
    res.json({ user, message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // ✅ TOKEN GENERATE (THIS WAS MISSING)
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

console.log("GENERATED TOKEN:", token);
    // ✅ SEND TOKEN
    res.status(200).json({
      message: "Login successful",
      token: token,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export  { registerUser, loginUser };
