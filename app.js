// app.js
const express = require('express');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const swaggerDocs = require('./swagger');
const errorHandler = require('./middleware/errorHandler'); // ✅ Import error handler

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ Swagger Docs
swaggerDocs(app);

// ✅ Routes
app.get('/', (req, res) => {
  res.send('✅ API is working!');
});

app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/favorites', wishlistRoutes);

// ✅ Global Error Handler (must come AFTER routes)
app.use(errorHandler); // ✅ Correct placement

module.exports = app;
