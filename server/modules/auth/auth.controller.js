import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import User from '../../common/models/user.model.js';

// Register user
const registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashed,
      role
    });

    res.json({
      message: 'Registration successful',
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (user.role !== role) {
      return res.status(401).json({ error: "Invalid role selected" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

   const token = jwt.sign(
  {
    id: user._id,
    username: user.username,
    role: user.role   // 🔥🔥🔥 ADD THIS
  },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);


    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { registerUser, loginUser };
