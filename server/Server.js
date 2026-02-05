require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./common/db/mongo');
const authRoutes = require('./modules/auth/auth.routes');

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// routes
app.use('/api', authRoutes);

// db
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

