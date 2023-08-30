const request = require('supertest');
const server = require('../api/server');
const db = require('../db/db');

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

it('sanity check', () => {
  expect(true).not.toBe(false)
});

// ==============================================

describe('server.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
});

// ==============================================

describe('db', () => {
  it('should return user ID 1', async () => {
    async function getAllUsers() { return db('users') };
    const users = await getAllUsers();
    expect(users[0].id).toBe(1);
  })
});

// ==============================================

describe('HTTP', () => {
  it('[GET] endpoint', async () => {
    // async function getAllUsers() { return db('users') };
    // const users = await getAllUsers();
    const res = await request(server).get('/api/users');
    expect(res.status).toBe(201);
  })
});

// ==============================================

describe('[POST] endpoint', () => {
  it('[POST] endpoint', async () => {
    const res = await request(server).post('/api/users').send({
      email: 'steve jobs',
      password: 'apple'
    });
    expect(res.status).toBe(201);
  })
});