// index.js
const path = require('path');

// .env sirf dev/test mein load karo; prod (Render) pe env dashboard se aayega
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.resolve(__dirname, '.env') });
  console.log('🧪 Loaded local .env');
}

const app = require('./app');
const connectDB = require('./connect');

const PORT = parseInt(process.env.PORT, 10) || 10000;
const HOST = '0.0.0.0';
const PUBLIC_URL =
  process.env.BASE_URL ||
  process.env.RENDER_EXTERNAL_URL || // if Render provides it
  `http://localhost:${PORT}`;

// Mask credentials for safe logging
const maskUri = (uri = '') =>
  uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@').replace(/\?.*$/, '');

(async () => {
  try {
    const { MONGO_URI } = process.env;
    if (!MONGO_URI) throw new Error('MONGO_URI is not set.');

    console.log('→ Using MONGO_URI:', maskUri(MONGO_URI));

    // Connect to MongoDB (connect.js should read process.env.MONGO_URI)
    await connectDB();

    const server = app.listen(PORT, HOST, () => {
      console.log(`🚀 Server running at ${PUBLIC_URL}`);
      console.log(`📚 Swagger docs at ${PUBLIC_URL}/api-docs`);
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
    console.error('❌ Startup error:', err);
    process.exit(1);
  }
})();
