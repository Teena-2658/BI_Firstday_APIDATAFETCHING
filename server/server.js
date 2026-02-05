require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./common/db/mongo");
const authRoutes = require("./modules/auth/auth.routes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://bi-firstday-apidatafetching.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin); // return exact origin
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions)); // ✅ THIS IS ENOUGH
app.use(express.json());

// routes
app.use("/api", authRoutes);

// db
connectDB();

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("API is running successfully 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});