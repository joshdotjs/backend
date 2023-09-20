require('../util/path');
const request = require('supertest');
const server = require('../server');
const db = required('db/db');

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
// ==============================================
// ==============================================
// ==============================================

describe('HTTP - /api/users', () => {

  // ============================================

  it('[GET] /api/users -- should have status 200', async () => {
    const res = await request(server).get('/api/orders');
    expect(res.status).toBe(200);
  });

  // ============================================

  it('[GET] /api/users --  should return user ID 1', async () => {
    async function getAllUsers() { return db('users') };
    const users = await getAllUsers();
    expect(users[0].id).toBe(1);
  })

  // ============================================


});


// ==============================================
// ==============================================
// ==============================================
// ==============================================


describe('HTTP - /api/orders', () => {

  // --------------------------------------------

  it('[GET] endpoint', async () => {
    const res = await request(server).get('/api/orders');
    expect(res.status).toBe(200);
  });

  // --------------------------------------------

  // it('[POST] endpoint - status 201', async () => {
  //   const res = await request(server).post('/api/users').send({
  //     email: 'steve@apple.com',
  //     password: 'apple',
  //     is_admin: true,
  //   });
  //   expect(res.status).toBe(201);
  // });

  // --------------------------------------------

  // it('[POST] endpoint - inserted entry', async () => {
  //   const res = await request(server).post('/api/sigs').send({
  //     first_name: 'steve',
  //     last_name: 'jobs',
  //     email: 'steve@apple.com',
  //   });
  //   const new_sig_obj = res;
  //   console.log('new_sig_obj: ', new_sig_obj);  

  //   expect(new_sig_obj['email']).toBe('steve@apple.com');
  //   expect(new_sig_obj['first_name']).toBe('steve');
  //   expect(new_sig_obj['last_name']).toBe('jobs');
  // });

  // --------------------------------------------
});
