const request = require('supertest');
const app = require('../app');
const connectDB = require('../connect');
const mongoose = require('mongoose');

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  // Prefer local/test DB; falls back to in-memory if local not running
  process.env.MONGO_URI_LOCAL = process.env.MONGO_URI_LOCAL || 'mongodb://127.0.0.1:27017/ecommerce_test';
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

test('GET / should return 200', async () => {
  const res = await request(app).get('/');
  expect(res.status).toBe(200);
});
