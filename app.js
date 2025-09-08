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
app.set('trust proxy', 1);

// Global middlewares
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(morgan('dev'));

// 🔎 tiny debug: show we are on the latest build
app.get('/__ok', (_req, res) => res.send('ok ' + new Date().toISOString()));

// Health FIRST (pretty)
app.get('/', (_req, res) =>
  res
    .status(200)
    .type('html')
    .send('<h1>✅ Ecommerce API is live</h1><p>Docs: <a href="/api-docs">/api-docs</a></p>')
);

// Swagger SECOND (before any routes/catch-alls)
swaggerDocs(app);

// API prefix
const API_PREFIX = process.env.API_PREFIX || '/api/v1';

// Versioned API routes
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/products`, productRoutes);
app.use(`${API_PREFIX}/cart`, cartRoutes);
app.use(`${API_PREFIX}/favorites`, wishlistRoutes);

// ⛔ TEMP: comment these 4 to avoid accidental collisions during debug
// app.use('/auth', authRoutes);
// app.use('/products', productRoutes);
// app.use('/cart', cartRoutes);
// app.use('/favorites', wishlistRoutes);

// 404 LAST
app.use((req, res) => res.status(404).send('Not Found'));

// Error handler VERY LAST
app.use(errorHandler);

module.exports = app;
