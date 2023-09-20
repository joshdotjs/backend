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

  it('[GET] /api/orders -- should have status 200', async () => {
    const resp = await request(server).get('/api/orders');
    expect(resp.status).toBe(200);
  });

  // --------------------------------------------

  it('[POST] /api/users -- should fail if user_id is NOT provided', async () => {
    const resp = await request(server).post('/api/orders').send({});
    expect(resp.status).toBe(400);
  });

  // --------------------------------------------

  it('[POST] /api/users -- should fail if order_items is NOT provided', async () => {
    const resp = await request(server).post('/api/orders').send({ user_id: 1});
    expect(resp.status).toBe(400);
  });

  // --------------------------------------------

  it('[POST] /api/users -- should fail if order_items is an EMPTY array', async () => {
    const resp = await request(server).post('/api/orders').send({ user_id: 1, order_items: []});
    expect(resp.status).toBe(400);
  });

  // --------------------------------------------

  it('[POST] /api/users -- should have status code 201', async () => {
    const resp = await request(server).post('/api/orders').send({ user_id: 1, order_items: [
      { product_id: 1, quantity: 1 },
    ]});
    expect(resp.status).toBe(201);
  });

  // --------------------------------------------

  it('[POST] /api/users -- should have total === 100', async () => {
    const resp = await request(server).post('/api/orders').send({ user_id: 1, order_items: [
      { product_id: 1, quantity: 1 },
    ]});
    const body = resp.body;
    const total = body.total;    
    expect(total).toBe(100);
  });

  // --------------------------------------------

  it('[POST] /api/users -- should have total === 200', async () => {
    const resp = await request(server).post('/api/orders').send({ user_id: 1, order_items: [
      { product_id: 1, quantity: 2 },
    ]});
    const body = resp.body;
    const total = body.total;    
    expect(total).toBe(200);
  });

  // --------------------------------------------

  it('[POST] /api/users -- should have total === 300', async () => {
    const resp = await request(server).post('/api/orders').send({ user_id: 1, order_items: [
      { product_id: 1, quantity: 1 },
      { product_id: 2, quantity: 1 },
    ]});
    const body = resp.body;
    const total = body.total;    
    expect(total).toBe(300);
  });

  // --------------------------------------------

  it('[POST] /api/users -- should have total === 600', async () => {
    const resp = await request(server).post('/api/orders').send({ user_id: 1, order_items: [
      { product_id: 1, quantity: 2 },
      { product_id: 2, quantity: 2 },
    ]});
    const body = resp.body;
    const total = body.total;    
    expect(total).toBe(600);
  });

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
