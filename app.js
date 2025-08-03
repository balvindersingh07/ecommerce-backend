const express = require('express');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const swaggerDocs = require('./swagger');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

app.use(express.json());

swaggerDocs(app); // Swagger UI

app.get('/', (req, res) => {
  res.send('✅ API is working!');
});

app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/favorites', wishlistRoutes);

// Global error handler
app.use(errorHandler);

module.exports = app;
