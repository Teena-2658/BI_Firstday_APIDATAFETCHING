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

/* -------------------- CORS (FULLY FIXED) -------------------- */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://bi-firstday-apidatafetching.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow server-to-server, Postman, curl
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
