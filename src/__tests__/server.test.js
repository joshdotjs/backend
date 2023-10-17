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
// ==============================================
// ==============================================
// ==============================================

describe('HTTP - /api/products', () => {

  // ============================================

  it('[GET] /api/products -- should have status 200', async () => {
    const res = await request(server).get('/api/products');
    expect(res.status).toBe(200);
  });

  // ============================================

  it('[GET] /api/users --  should return user ID 1', async () => {
    async function getAllUsers() { return db('users') };
    const users = await getAllUsers();
    expect(users[0].id).toBe(1);
  });

  // ============================================

});

// ==============================================
// ==============================================
// ==============================================
// ==============================================

// describe('HTTP - /api/users', () => {

//   // ============================================

//   // it('[GET] /api/users -- should have status 200', async () => {
//   //   const res = await request(server).get('/api/orders');
//   //   expect(res.status).toBe(200);
//   // });

//   // ============================================

//   // it('[GET] /api/users --  should return user ID 1', async () => {
//   //   async function getAllUsers() { return db('users') };
//   //   const users = await getAllUsers();
//   //   expect(users[0].id).toBe(1);
//   // });

//   // ============================================


// });


// ==============================================
// ==============================================
// ==============================================
// ==============================================


// describe('HTTP - /api/orders', () => {

//   // --------------------------------------------

//   // it('[GET] /api/orders -- should have status 200', async () => {
//   //   const resp = await request(server).get('/api/orders');
//   //   expect(resp.status).toBe(200);
//   // });

//   // --------------------------------------------

//   // it('[POST] /api/orders -- should fail if user_id is NOT provided', async () => {
//   //   const resp = await request(server).post('/api/orders').send({});
//   //   expect(resp.status).toBe(400);
//   // });

//   // --------------------------------------------

//   // it('[POST] /api/orders -- should fail if order_items is NOT provided', async () => {
//   //   const resp = await request(server).post('/api/orders').send({ user_id: 1});
//   //   expect(resp.status).toBe(400);
//   // });

//   // --------------------------------------------

//   // it('[POST] /api/orders -- should fail if order_items is an EMPTY array', async () => {
//   //   const resp = await request(server).post('/api/orders').send({ user_id: 1, order_items: []});
//   //   expect(resp.status).toBe(400);
//   // });

//   // --------------------------------------------

//   // it('[POST] /api/orders -- should have status code 201', async () => {
//   //   const resp = await request(server).post('/api/orders').send({ user_id: 1, order_items: [
//   //     { product_id: 1, quantity: 1 },
//   //   ]});
//   //   expect(resp.status).toBe(201);
//   // });

//   // --------------------------------------------

//   // it('[POST] /api/orders -- should have total === 100', async () => {
//   //   const resp = await request(server).post('/api/orders').send({ user_id: 1, order_items: [
//   //     { product_id: 1, quantity: 1 },
//   //   ]});
//   //   const body = resp.body;
//   //   const total = body.created_order.total;    
//   //   expect(total).toBe(100);
//   // });

//   // --------------------------------------------

//   // it('[POST] /api/orders -- should have total === 200', async () => {
//   //   const resp = await request(server).post('/api/orders').send({ user_id: 1, order_items: [
//   //     { product_id: 1, quantity: 2 },
//   //   ]});
//   //   const body = resp.body;
//   //   const total = body.created_order.total;    
//   //   expect(total).toBe(200);
//   // });

//   // --------------------------------------------

//   // it('[POST] /api/orders -- should have total === 300', async () => {
//   //   const resp = await request(server).post('/api/orders').send({ user_id: 1, order_items: [
//   //     { product_id: 1, quantity: 1 },
//   //     { product_id: 2, quantity: 1 },
//   //   ]});
//   //   const body = resp.body;
//   //   const total = body.created_order.total;    
//   //   expect(total).toBe(300);
//   // });

//   // --------------------------------------------

//   // it('[POST] /api/orders -- should have total === 600', async () => {
//   //   const resp = await request(server).post('/api/orders').send({ user_id: 1, order_items: [
//   //     { product_id: 1, quantity: 2 },
//   //     { product_id: 2, quantity: 2 },
//   //   ]});
//   //   const body = resp.body;
//   //   const total = body.created_order.total;    
//   //   expect(total).toBe(600);
//   // });

//   // --------------------------------------------

//   // it('[POST] /api/orders -- line_items row 1 should have product_id === 1', async () => {
//   //   const resp = await request(server).post('/api/orders').send({ user_id: 1, order_items: [
//   //     { product_id: 1, quantity: 2 },
//   //     { product_id: 2, quantity: 2 },
//   //   ]});
//   //   const body = resp.body;
//   //   const line_items = body.line_items;
//   //   expect(line_items[0].product_id).toBe(1);
//   // });

//   // --------------------------------------------

//   // it('[POST] /api/orders -- line_items row 2 should have product_id === 2', async () => {
//   //   const resp = await request(server).post('/api/orders').send({ user_id: 1, order_items: [
//   //     { product_id: 1, quantity: 2 },
//   //     { product_id: 2, quantity: 2 },
//   //   ]});
//   //   const body = resp.body;
//   //   const line_items = body.line_items;
//   //   expect(line_items[1].product_id).toBe(2);
//   // });

//   // --------------------------------------------

//   // it('[POST] /api/orders -- line_items row 1 should have quantity === 2', async () => {
//   //   const resp = await request(server).post('/api/orders').send({ user_id: 1, order_items: [
//   //     { product_id: 1, quantity: 2 },
//   //     { product_id: 2, quantity: 2 },
//   //   ]});
//   //   const body = resp.body;
//   //   const line_items = body.line_items;
//   //   expect(line_items[0].quantity).toBe(2);
//   // });

//   // --------------------------------------------

//   // it('[POST] /api/orders -- line_items row 2 should have quantity === 2', async () => {
//   //   const resp = await request(server).post('/api/orders').send({ user_id: 1, order_items: [
//   //     { product_id: 1, quantity: 2 },
//   //     { product_id: 2, quantity: 2 },
//   //   ]});
//   //   const body = resp.body;
//   //   const line_items = body.line_items;
//   //   expect(line_items[1].quantity).toBe(2);
//   // });

//   // --------------------------------------------
// });
