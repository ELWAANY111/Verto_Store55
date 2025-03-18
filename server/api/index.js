const express = require("express");
const productRoutes = require("../routes/productRoutes");

const app = express();

// Middlewares
app.use(express.json());
app.use("/api/products", productRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

module.exports = app; // Export app instead of using serverless-http
