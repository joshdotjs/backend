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

describe('Controller - Auth', () => {

  // ============================================

  it('login() without email or password in body should fail', async () => {
    const resp1 = await request(server).post('/api/auth/login').send({ password: 'a' });
    expect(resp1.status).toBe(401);

    const resp2 = await request(server).post('/api/auth/login').send({ email: 'a' });
    expect(resp2.status).toBe(401);
  });

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

    //          {
    //            "status": "success",
    //            "user": {
    //                "id": 1, [number]
    //                "email": "josh@josh.com", [string]
    //                "password": "$2a$08$Yvcc7Kf4xpovNutrTrXDreGL.ujwOdPpEy9mXfhsxOqYqx0fwcbB.", [string]
    //                "is_admin": true, [boolean]
    //                "first_name": "josh", [string]
    //                "last_name": "holloway", [string]
    //                "created_at": "2023-10-05T00:39:27.702Z", [string]
    //                "updated_at": "2023-10-05T00:39:27.702Z" [string]
    //            },
    //            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb3NoQGpvc2guY29tIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY5NzM2MjE4NiwiZXhwIjoxNjk3NDQ4NTg2fQ.bGqJJjrZN9X8R7vAsJBoKghJF5IpuypL8uK5kAee7a0"
    //          }
    const { status, user, token } = resp.body;
    expect(status).toBe('success');
    expect(user).toBeDefined();
    expect(typeof user).toBe('object');
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');

    const { id, email, password, is_admin, first_name, last_name, created_at, updated_at } = user;
    expect(id).toBe(1);
    expect(email).toBe('josh@josh.com');
    expect(typeof password).toBe('string');
    expect(is_admin).toBe(true);
    expect(first_name).toBe('josh');
    expect(last_name).toBe('holloway');
    expect(typeof created_at).toBe('string');
    expect(typeof updated_at).toBe('string');
  });

  // ============================================

});
