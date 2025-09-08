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

app.set('trust proxy', 1); // Render behind proxy

// Core middlewares
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(morgan('dev'));

// Health FIRST
app.get('/', (_req, res) => res.status(200).send('✅ API is working!'));

// Swagger SECOND (must be before catch-alls)
swaggerDocs(app);

// API prefix (changeable via env)
const API_PREFIX = process.env.API_PREFIX || '/api/v1';

// ---- Versioned API routes ----
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/products`, productRoutes);
app.use(`${API_PREFIX}/cart`, cartRoutes);
app.use(`${API_PREFIX}/favorites`, wishlistRoutes);

// (Optional) Backward-compatible unprefixed routes
// Comment these out if you only want /api/v1/*
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/favorites', wishlistRoutes);

// 404 catch-all LAST
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Not found' });
});

// Error handler VERY LAST
app.use(errorHandler);

module.exports = app;
