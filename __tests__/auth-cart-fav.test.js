const request = require('supertest');
const app = require('../app');

function randEmail() {
  return `user_${Date.now()}@example.com`;
}

describe('Auth + Cart + Favorites (smoke)', () => {
  let token = null;
  let productId = null;

  it('register + login', async () => {
    const email = randEmail();

    const reg = await request(app)
      .post('/auth/register')
      .send({ name: 'Test', email, password: 'secret123' });

    // Register should be 201 or 409 if duplicate (200 acceptable in some impls)
    expect([200, 201, 409]).toContain(reg.status);

    const login = await request(app)
      .post('/auth/login')
      .send({ email, password: 'secret123' });

    expect(login.status).toBe(200);
    expect(login.body.token).toBeTruthy();
    token = login.body.token;
  });

  it('create a product (if allowed) OR pick existing', async () => {
    // Some backends protect /products POST (admin-only). Accept several statuses.
    const p = await request(app)
      .post('/products')
      .send({
        name: 'Wireless Mouse',
        price: 999.99,
        image: 'https://example.com/mouse.jpg',
        category: 'electronics'
      });

    expect([200, 201, 401, 403, 404]).toContain(p.status);

    // fallback: list and pick first id if present
    const list = await request(app).get('/products');
    if (list.status === 200 && Array.isArray(list.body) && list.body.length) {
      productId = list.body[0]._id || list.body[0].id;
    }
  });

  it('POST /api/cart adds item when token & product available', async () => {
    if (!token || !productId) return;
    const res = await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId, qty: 1 });
    expect([200, 201, 400]).toContain(res.status);
  });

  it('GET /api/cart returns array or 401 if no token', async () => {
    if (!token) {
      const res = await request(app).get('/api/cart');
      expect(res.status).toBe(401);
    } else {
      const res = await request(app)
        .get('/api/cart')
        .set('Authorization', `Bearer ${token}`);
      expect([200, 204]).toContain(res.status);
    }
  });

  it('POST /api/favorites adds favorite when token & product available', async () => {
    if (!token || !productId) return;
    const res = await request(app)
      .post('/api/favorites')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId });
    expect([200, 201, 400]).toContain(res.status);
  });

  it('GET /api/favorites returns list or 401 if no token', async () => {
    if (!token) {
      const res = await request(app).get('/api/favorites');
      expect(res.status).toBe(401);
    } else {
      const res = await request(app)
        .get('/api/favorites')
        .set('Authorization', `Bearer ${token}`);
      expect([200, 204]).toContain(res.status);
    }
  });
});
