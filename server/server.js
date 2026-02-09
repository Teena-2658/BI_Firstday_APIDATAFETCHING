require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { connectDB } = require("./common/db/mongo");

const authRoutes = require("./modules/auth/auth.routes");
const productRoutes = require("./modules/products/product.routes");

const app = express();

/* -------------------- ENSURE UPLOADS FOLDER -------------------- */
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

/* -------------------- CORS (OPEN – FINAL FIX) -------------------- */
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* -------------------- MIDDLEWARE -------------------- */
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* -------------------- ROUTES -------------------- */
app.use("/api", authRoutes);
app.use("/api/products", productRoutes);

/* -------------------- DB -------------------- */
connectDB();

/* -------------------- ROOT -------------------- */
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

/* -------------------- START -------------------- */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
