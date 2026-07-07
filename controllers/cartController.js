const Cart = require("../models/Cart");
const Product = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");

// Add Product To Cart
const addToCart = asyncHandler(async (req, res) => {
  const { user, product, quantity } = req.body;

  const productExists = await Product.findById(product);

  if (!productExists) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (productExists.stock < quantity) {
    res.status(400);
    throw new Error("Not enough stock");
  }

  let cart = await Cart.findOne({ user });

  if (!cart) {
    cart = await Cart.create({
      user,
      items: [],
      totalPrice: 0,
    });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === product,
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({
      product,
      quantity,
      price: productExists.price,
    });
  }

  cart.totalPrice = cart.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  await cart.save();

  res.status(200).json(cart);
});

// Get User Cart
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({
    user: req.params.user,
  }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    return res.status(404).json({
      message: "Cart is empty",
    });
  }

  res.json(cart);
});

// Update Quantity
const updateQuantity = asyncHandler(async (req, res) => {
  const { quantity } = req.body;

  const cart = await Cart.findOne({
    user: req.params.user,
  });

  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
    });
  }

  const item = cart.items.find(
    (item) => item.product.toString() === req.params.productId,
  );

  if (!item) {
    return res.status(404).json({
      message: "Item not found",
    });
  }

  if (quantity <= 0) {
    cart.items = cart.items.filter(
      (i) => i.product.toString() !== req.params.productId,
    );
  } else {
    item.quantity = quantity;
  }

  cart.totalPrice = cart.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  await cart.save();

  res.json(cart);
});

// Remove Item
const removeItem = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({
    user: req.params.user,
  });

  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
    });
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== req.params.productId,
  );

  cart.totalPrice = cart.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  await cart.save();

  res.json({
    success: true,
    message: "Item removed successfully",
    cart,
  });
});

// Clear Cart
const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({
    user: req.params.user,
  });

  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
    });
  }

  cart.items = [];
  cart.totalPrice = 0;

  await cart.save();

  res.json({
    message: "Cart cleared successfully",
  });
});

module.exports = {
  addToCart,
  getCart,
  updateQuantity,
  removeItem,
  clearCart,
};
