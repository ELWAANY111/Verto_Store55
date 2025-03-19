const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();

// 🔹 Middlewares
app.use(express.json());
app.use(cors());

// 🔹 API Routes
app.use("/api/products", productRoutes);

// 🔹 Root route (for testing)
app.get("/", (req, res) => {
  res.send("🚀 Server is running on Vercel!");
});

// 🔹 Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Export app for Vercel (No `app.listen()`)
module.exports = app;
