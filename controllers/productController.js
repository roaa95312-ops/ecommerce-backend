const Product = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");
const Category = require("../models/Category");

// Create Product
const createProduct = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.body.category);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  const product = await Product.create(req.body);

  res.status(201).json(product);
});

// Get All Products
const getProducts = asyncHandler(async (req, res) => {
  const filter = {};

  // Filter by Category
  if (req.query.category) {
    filter.category = req.query.category;
  }

  // Filter by Minimum Price
  if (req.query.minPrice) {
    filter.price = {
      ...filter.price,
      $gte: Number(req.query.minPrice),
    };
  }

  // Filter by Maximum Price
  if (req.query.maxPrice) {
    filter.price = {
      ...filter.price,
      $lte: Number(req.query.maxPrice),
    };
  }

  // Filter by Stock
  if (req.query.inStock === "true") {
    filter.inStock = true;
  }

  // Search
  if (req.query.search) {
    filter.$or = [
      {
        name: {
          $regex: req.query.search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: req.query.search,
          $options: "i",
        },
      },
    ];
  }

  const products = await Product.find(filter);

  res.status(200).json(products);
});

// Get Single Product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "category",
    "name",
  );

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json(product);
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json(product);
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();

  res.json({
    message: "Product deleted successfully",
  });
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
