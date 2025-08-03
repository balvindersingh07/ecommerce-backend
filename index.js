const app = require('./app');
const connectDB = require('./connect');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at ${BASE_URL}`);
      console.log(`📚 Swagger docs at ${BASE_URL}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  });
