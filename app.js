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

// Middlewares
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(morgan('dev'));

// Debug endpoints (dev only)
if (process.env.NODE_ENV !== 'production') {
  app.get('/__ok', (_req, res) => res.send('ok ' + new Date().toISOString()));
  app.get('/__build', (_req, res) =>
    res.json({ sha: process.env.RENDER_GIT_COMMIT || 'n/a', startedAt: new Date().toISOString() })
  );
}

// Health
app.get('/', (_req, res) =>
  res
    .status(200)
    .type('html')
    .send('<h1>✅ Ecommerce API is live</h1><p>Docs: <a href="/api-docs">/api-docs</a></p>')
);

// Swagger BEFORE routes/catch-alls
swaggerDocs(app);

// -------- API ROUTES --------
const API_PREFIX = process.env.API_PREFIX || '/api/v1';

// Versioned (recommended)
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/products`, productRoutes);
app.use(`${API_PREFIX}/cart`, cartRoutes);
app.use(`${API_PREFIX}/favorites`, wishlistRoutes);

// Teacher-compatibility aliases (ON)
app.use('/auth', authRoutes);            // optional but harmless
app.use('/products', productRoutes);     // GET /products, GET /products/:category
app.use('/cart', cartRoutes);            // GET /cart
app.use('/favorites', wishlistRoutes);   // GET /favorites

// Per guideline: POST on /api/*
app.use('/api/cart', cartRoutes);        // POST /api/cart
app.use('/api/favorites', wishlistRoutes); // POST /api/favorites

// 404 LAST
app.use((req, res) => res.status(404).json({ success: false, message: 'Not found' }));

// Error handler VERY LAST
app.use(errorHandler);

module.exports = app;
