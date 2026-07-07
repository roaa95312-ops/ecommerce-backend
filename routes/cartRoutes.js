const express = require("express");

const {
  addToCart,
  getCart,
  updateQuantity,
  removeItem,
  clearCart,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/", addToCart);

router.get("/:user", getCart);

router.patch("/:user/:productId", updateQuantity);

router.delete("/:user/:productId", removeItem);

router.delete("/:user", clearCart);

module.exports = router;
