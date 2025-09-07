// app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');            // ✅ NEW: Auth routes
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');

// If "swaggerDocs is not a function" again, use './swagger.js'
const swaggerDocs = require('./swagger');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Global middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Swagger UI
swaggerDocs(app);

// Health
app.get('/', (req, res) => {
  res.status(200).send('✅ API is working!');
});

// Auth
app.use('/auth', authRoutes);                                 // ✅ NEW

// Products
app.use('/products', productRoutes);

// Cart & Favorites
app.use('/cart', cartRoutes);
app.use('/favorites', wishlistRoutes);

// Guideline-compliant aliases
app.use('/api/cart', cartRoutes);
app.use('/api/favorites', wishlistRoutes);

// Global error handler
app.use(errorHandler);

module.exports = app;
