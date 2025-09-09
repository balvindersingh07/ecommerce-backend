// index.js
const path = require('path');

// .env sirf dev/test vich load karo
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.resolve(__dirname, '.env') });
  console.log('🧪 Loaded local .env');
}

const app = require('./app');
const connectDB = require('./connect');

const HOST = '0.0.0.0';
// Teacher guidelines naal match layi default 3000, par env override karega
const PORT = parseInt(process.env.PORT, 10) || 3000;

const PUBLIC_URL =
  (process.env.BASE_URL ||
   process.env.RENDER_EXTERNAL_URL ||
   `http://localhost:${PORT}`).replace(/\/+$/, '');

const maskUri = (uri = '') =>
  uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@').replace(/\?.*$/, '');

(async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error('MONGO_URI missing in environment.');

    console.log('→ Using MONGO_URI:', maskUri(uri));
    await connectDB(); // reads MONGO_URI (and DB_NAME optional)

    const server = app.listen(PORT, HOST, () => {
      console.log('✅ Build SHA:', process.env.RENDER_GIT_COMMIT || 'n/a');
      console.log(`🚀 Server running at ${PUBLIC_URL}`);
      console.log(`📚 Swagger docs at ${PUBLIC_URL}/api-docs`);
    });

    // graceful shutdown
    const shutdown = (sig) => () => {
      console.log(`\n${sig} received. Shutting down gracefully…`);
      server.close(() => {
        console.log('💤 HTTP server closed.');
        process.exit(0);
      });
      setTimeout(() => process.exit(1), 10000).unref();
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
