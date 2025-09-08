// app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');

const swaggerDocs = require('./swagger');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Core middlewares
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*'}));
app.use(morgan('dev'));

// --- Swagger UI (KEEP BEFORE routes/catch-all) ---
swaggerDocs(app);

// API prefix (changeable by env)
const API_PREFIX = process.env.API_PREFIX || '/api/v1';

// Health
app.get('/', (_req, res) => res.status(200).send('✅ API is working!'));

// ---- Versioned API routes ----
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/products`, productRoutes);
app.use(`${API_PREFIX}/cart`, cartRoutes);
app.use(`${API_PREFIX}/favorites`, wishlistRoutes);

// (Optional) Backward-compatible unprefixed routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/favorites', wishlistRoutes);

// 404 catch-all (last regular middleware)
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Not found' });
});

// Global error handler (very last)
app.use(errorHandler);

module.exports = app;
