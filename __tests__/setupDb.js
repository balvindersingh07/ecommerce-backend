// __tests__/setupDb.js
const mongoose = require('mongoose');
const connectDB = require('../connect'); // your connect.js default export

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  // Prefer local test DB; connect.js fallback → memory if local not up
  process.env.MONGO_URI_LOCAL = process.env.MONGO_URI_LOCAL || 'mongodb://127.0.0.1:27017/ecommerce_test';
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close(true);
});
