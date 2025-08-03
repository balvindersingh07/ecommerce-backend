# 🛒 E-commerce Backend API

This is the backend API for the E-commerce project developed using Node.js, Express.js, and MongoDB. It supports product listing, cart, and wishlist functionality with full API documentation powered by Swagger.

---

## 🔗 Hosted API

- **Base URL**: [https://ecommerce-backend-usuf.onrender.com](https://ecommerce-backend-usuf.onrender.com)
- **Swagger Docs**: [https://ecommerce-backend-usuf.onrender.com/api-docs](https://ecommerce-backend-usuf.onrender.com/api-docs)

---

## 📦 Features

| Feature                          | Method | Endpoint                          | Description                                  |
|----------------------------------|--------|-----------------------------------|----------------------------------------------|
| Get All Products                 | GET    | `/products`                       | Fetch all products                           |
| Get Products by Category         | GET    | `/products/:category`            | Fetch products based on category             |
| Add Product to Cart              | POST   | `/cart`                           | Add product to cart                          |
| Get Cart Items                   | GET    | `/cart`                           | Retrieve all products in the cart            |
| Add Product to Favorites         | POST   | `/favorites`                      | Add product to favorites list                |
| Get Favorite Items               | GET    | `/favorites`                      | Retrieve all favorite products               |

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- Mongoose
- Swagger (API documentation)
- Render (for deployment)
- GitHub (version control)

---

## 🧪 Run Locally

1. **Clone the repo**
 
   git clone https://github.com/your-username/ecommerce-backend.git
   cd ecommerce-backend

MONGO_URI=mongodb+srv://ecomuser:ecom@123@cluster0.weptwmn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=10000
JWT_SECRET=supersecretkey123
BASE_URL=http://localhost:10000


🧭 Folder Structure
.
├── index.js              # DB connection & server start
├── app.js                # Routes and middleware
├── connect.js            # MongoDB connection
├── routes/               # Product, Cart, Wishlist routes
├── controllers/          # Logic separated from routes
├── models/               # Mongoose schemas
├── middleware/           # Custom error handler
├── swagger.js            # Swagger docs setup
├── .env
└── README.md
📘 API Documentation
Swagger UI:
https://ecommerce-backend-usuf.onrender.com/api-docs


✅ API working on https://ecommerce-backend-usuf.onrender.com

📚 Swagger UI at /api-docs

✅ MongoDB collections in Atlas (cart, favorites, products)

✅ GitHub repository URL and commits

✅ Screenshot of local .env file (sanitized if required)

✍️ Developed By
Balvinder Singh
Full Stack Developer
GitHub: github.com/balvindersingh07
