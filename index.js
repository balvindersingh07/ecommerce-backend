// index.js
const app = require('./app');
const connectDB = require('./connect');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`📚 Swagger docs at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  });
