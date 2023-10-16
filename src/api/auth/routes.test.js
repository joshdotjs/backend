require('../../util/path');
const request = require('supertest');
const server = require('../../server');
const db = required('db/db');
const { hash } = required('util/hash');

// const UsersModel = require('./model');

// beforeAll(async () => {
//   await db.migrate.rollback();
//   await db.migrate.latest();
// });
// beforeEach(async () => {
//   await db.seed.run();
// });
// afterAll(async () => {
//   await db.destroy();
// });

// ==============================================
// ==============================================
// ==============================================
// ==============================================

describe('/src/api/users/model.js', () => {
  it(' -- sanity check', () => {
    expect(true).not.toBe(false)
  });

  // ============================================

  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
});

// ==============================================
// ==============================================
// ==============================================
// ==============================================

describe('Controller - Auth', () => {

  // ============================================

  it('login() with email not in DB should fail', async () => {
    const resp = await request(server).post('/api/auth/login').send({ email: 'a@a.com', password: 'a' });
    expect(resp.status).toBe(401);
  });

  // ============================================

  it('login() with wrong password should fail', async () => {
    const resp = await request(server).post('/api/auth/login').send({ email: 'josh@josh.com', password: 'X' });
    expect(resp.status).toBe(401);
  });

  // ============================================

  it('login() with correct email & password should succeed', async () => {
    const resp = await request(server).post('/api/auth/login').send({ email: 'josh@josh.com', password: 'josh' });
    expect(resp.status).toBe(200);
  });

  // ============================================

});
