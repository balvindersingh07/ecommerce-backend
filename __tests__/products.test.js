const request = require('supertest');
const app = require('../app');

describe('Products', () => {
  it('GET /products returns array or 204', async () => {
    const res = await request(app).get('/products');
    expect([200, 204]).toContain(res.status); // 204 if empty DB
    if (res.status === 200) {
      expect(Array.isArray(res.body)).toBe(true);
    }
  });

  it('GET /products/:category works (alias)', async () => {
    const res = await request(app).get('/products/electronics');
    expect([200, 204]).toContain(res.status);
  });
});
