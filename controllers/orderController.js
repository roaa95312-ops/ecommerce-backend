const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");

// Checkout
const checkout = asyncHandler(async (req, res) => {
  const { user, shippingAddress } = req.body;

  const cart = await Cart.findOne({ user }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    res.status(400);
    throw new Error("Cart is empty");
  }

  let totalPrice = 0;
  const orderItems = [];

  for (const item of cart.items) {
    const product = await Product.findById(item.product._id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    if (product.stock < item.quantity) {
      res.status(400);
      throw new Error(`${product.name} is out of stock`);
    }

    product.stock -= item.quantity;
    product.inStock = product.stock > 0;
    await product.save();

    totalPrice += product.price * item.quantity;

    orderItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    });
  }

  const order = await Order.create({
    orderNumber: `ORD-${Date.now()}`,
    user,
    items: orderItems,
    totalPrice,
    shippingAddress,
  });

  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();

  res.status(201).json(order);
});

// Get All Orders
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("items.product");
  res.json(orders);
});

// Get Order By ID
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("items.product");

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.json(order);
});

// Update Order Status
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const allowedStatus = [
    "pending",
    "paid",
    "shipped",
    "delivered",
    "cancelled",
  ];

  if (!allowedStatus.includes(status)) {
    res.status(400);
    throw new Error("Invalid order status");
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.status = status;
  await order.save();

  res.json(order);
});

module.exports = {
  checkout,
  getOrders,
  getOrderById,
  updateOrderStatus,
};
