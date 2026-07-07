const express = require("express");

const {
  checkout,
  getOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

// Checkout
router.post("/checkout", checkout);

// Get All Orders
router.get("/", getOrders);

// Get Order By ID
router.get("/:id", getOrderById);

// Update Order Status
router.patch("/:id/status", updateOrderStatus);

module.exports = router;
