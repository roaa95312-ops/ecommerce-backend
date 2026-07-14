===========================================
E-Commerce Backend API
===========================================

1. Project Description & Features

---

Project:
E-Commerce Backend API

Description:
A complete RESTful API for an E-Commerce system built using Node.js, Express.js, MongoDB and Mongoose.

Tech Stack:

- Node.js
- Express.js
- MongoDB
- Mongoose

Built API Modules:

- Categories API
- Products API
- Cart API
- Orders API

Main Features:

- Categories CRUD
- Products CRUD
- Product Filtering
- Product Search
- Cart Management
- Checkout System
- Orders Management
- Order Status Update
- Error Handling
- MongoDB Integration

===========================================

2. Prerequisites & Installation

---

Prerequisites:

- Node.js
- MongoDB
- npm

Installation Steps:

1. Clone the repository

git clone https://github.com/roaa95312-ops/ecommerce-backend

2. Open project

cd ecommerce-backend

3. Install dependencies

npm install

4. Create .env file

5. Start the server

npm run dev

===========================================

3. Environment Variables

---

Variable Description

PORT Server Port

MONGO_URI MongoDB Connection String

NODE_ENV development

===========================================

4. API Endpoints & Project Structure

---

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

Filtering

GET /api/products?category=id

GET /api/products?minPrice=1000&maxPrice=30000

GET /api/products?search=laptop

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

===========================================

Project Structure

config/
controllers/
middleware/
models/
routes/
utils/
postman/
server.js
app.js
package.json
README.txt

===========================================

GitHub Repository

https://github.com/roaa95312-ops/ecommerce-backend
