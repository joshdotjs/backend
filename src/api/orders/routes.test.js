require('../../util/path');
const request = require('supertest');
const server = require('../../server');
const db = required('db/db');
const { hash } = required('util/hash');

// const UsersModel = require('./model');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

// ==============================================
// ==============================================
// ==============================================
// ==============================================

describe('/src/api/users/model.js', () => {
  it(' -- sanity check', () => {
    expect(true).not.toBe(false)
  });
});

// ==============================================
// ==============================================
// ==============================================
// ==============================================

describe('Routes - Orders', () => {

  // ============================================

  it('[GET]  /api/orders', async () => {
    const resp = await request(server).post('/api/auth/login').send({ email: 'josh@josh.com', password: 'josh' });
    const { status, user, token } = resp.body;
    expect(resp.status).toBe(200);

    // try to access orders withOUT token
    const resp1 = await request(server).get('/api/orders')
    expect(resp1.status).toBe(401); // from middleware restricted()

    // try to access orders WITH valid token
    const resp2 = await request(server).get('/api/orders').set('Authorization', token)  // Setting a custom header
    expect(resp2.status).toBe(200);
  });

  // ============================================

});
