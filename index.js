// index.js
const path = require('path');

// Load env FIRST and override any stale process vars
require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
  override: true,
});

const app = require('./app');
const connectDB = require('./connect');

const PORT = Number(process.env.PORT) || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// Mask credentials for safe logging
const maskUri = (uri = '') =>
  uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@').replace(/\?.*$/, '');

(async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not set. Check your .env file.');
    }

    console.log('→ Using MONGO_URI:', maskUri(process.env.MONGO_URI));

    // Connect to MongoDB (uses MONGO_URI inside connect.js)
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running at ${BASE_URL}`);
      console.log(`📚 Swagger docs at ${BASE_URL}/api-docs`);
    });

    // Graceful shutdown
    const shutdown = (sig) => () => {
      console.log(`\n${sig} received. Shutting down gracefully…`);
      server.close(() => {
        console.log('💤 HTTP server closed.');
        process.exit(0);
      });
      setTimeout(() => process.exit(1), 10_000).unref();
    };
    process.on('SIGINT', shutdown('SIGINT'));
    process.on('SIGTERM', shutdown('SIGTERM'));

    process.on('unhandledRejection', (err) => {
      console.error('Unhandled Rejection:', err);
      process.exit(1);
    });
    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
      process.exit(1);
    });
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  }
})();
