# E-Commerce Backend API

## Overview

This project is a backend API for an E-Commerce application built using Node.js and Express.js.
It provides the main functionalities required for managing products, categories, carts, and orders with database integration.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Postman
- Git & GitHub

## Features

### Categories

- Create a new category
- Get all categories
- Get category by ID
- Update category
- Delete category

### Products

- Create a new product
- Get all products
- Get product by ID
- Update product
- Delete product
- Search and filter products

### Cart

- Add products to cart
- View cart items
- Update cart quantity
- Remove products from cart
- Clear cart

### Orders

- Create orders
- View orders
- Manage order details
- Checkout functionality with stock validation

## Project Structure

```text
ecommerce-backend/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── server.js
├── package.json
└── README.md
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/roaa95312-ops/ecommerce-backend.git
```

2. Navigate to the project folder:

```bash
cd ecommerce-backend
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file and add your environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

5. Run the server:

```bash
npm start
```

## API Endpoints

Categories
GET /api/categories
GET /api/categories/:id
POST /api/categories
PATCH /api/categories/:id
DELETE /api/categories/:id

Products
GET /api/products
GET /api/products/:id
POST /api/products
PATCH /api/products/:id
DELETE /api/products/:id

Cart
POST /api/cart
GET /api/cart/:user
PATCH /api/cart/:user/:productId
DELETE /api/cart/:user/:productId
DELETE /api/cart/:user

Orders
POST /api/orders/checkout
GET /api/orders
GET /api/orders/:id
PATCH /api/orders/:id/status

## API Testing

The API was tested using Postman.

GitHub Repository:

https://github.com/roaa95312-ops/ecommerce-backend

Postman Collection:

<your-postman-collection-link>

The collection includes requests for:

- Categories
- Products
- Cart
- Orders

## Error Handling

The project includes:

- Global error handling middleware
- Proper HTTP status codes
- Clear error messages

## Database

MongoDB is used as the database, and Mongoose is used for creating schemas and managing data models.

## Author

Roaa Ahmed
