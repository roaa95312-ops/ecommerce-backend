require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const Category = require("./models/Category");
const Product = require("./models/Product");

connectDB();

const importData = async () => {
  try {
    console.log("🗑 Clearing Database...");

    // Delete old data
    await Product.deleteMany();
    await Category.deleteMany();

    console.log("✅ Database Cleared");

    // Create Categories
    const categories = await Category.insertMany([
      {
        name: "Electronics",
        description: "Electronic Devices",
        slug: "electronics",
      },
      {
        name: "Mobiles",
        description: "Smart Phones",
        slug: "mobiles",
      },
      {
        name: "Accessories",
        description: "Computer Accessories",
        slug: "accessories",
      },
    ]);

    // Create Products
    await Product.insertMany([
      {
        name: "Dell Laptop",
        description: "Dell Inspiron 15",
        price: 25000,
        stock: 10,
        inStock: true,
        images: [],
        category: categories[0]._id,
      },
      {
        name: "HP Laptop",
        description: "HP Pavilion",
        price: 30000,
        stock: 5,
        inStock: true,
        images: [],
        category: categories[0]._id,
      },
      {
        name: "iPhone 15",
        description: "Apple Smartphone",
        price: 55000,
        stock: 8,
        inStock: true,
        images: [],
        category: categories[1]._id,
      },
      {
        name: "Samsung S25",
        description: "Samsung Smartphone",
        price: 48000,
        stock: 12,
        inStock: true,
        images: [],
        category: categories[1]._id,
      },
      {
        name: "Wireless Mouse",
        description: "Logitech Mouse",
        price: 1200,
        stock: 30,
        inStock: true,
        images: [],
        category: categories[2]._id,
      },
      {
        name: "Mechanical Keyboard",
        description: "RGB Gaming Keyboard",
        price: 3500,
        stock: 15,
        inStock: true,
        images: [],
        category: categories[2]._id,
      },
    ]);

    console.log("🌱 Data Imported Successfully");

    await mongoose.disconnect();

    console.log("🔌 Database Disconnected");

    process.exit(0);
  } catch (error) {
    console.error(error);

    await mongoose.disconnect();

    process.exit(1);
  }
};

importData();
