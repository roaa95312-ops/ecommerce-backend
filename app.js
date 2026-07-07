const express = require("express");
// const mongoSanitize = require("express-mongo-sanitize");

const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());
// app.use(mongoSanitize());

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("E-Commerce API is Running...");
});

// 404 Handler
app.use((req, res, next) => {
  const error = new Error("Route Not Found");
  res.status(404);
  next(error);
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
