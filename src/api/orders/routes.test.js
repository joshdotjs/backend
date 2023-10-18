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

    // updating the order status changes the orders array indices (i.e., orders[0] will likely not have order.id === 1)
    // -however, since we are re-seeding on every run here, the order.id === 1 should be the first order in the orders array
    const orders = resp2.body;
    // console.log('orders', orders);
    expect(orders[0].id).toBe(1);
    expect(orders[0].status).toBe(1);
    expect(orders[0].user_id).toBe(1);
    // expect(orders[0].total).toBe(100); // NOTE: Seeding total calculation needs to be fixed
    expect(orders[0].uuid).toBeDefined();
    expect(orders[0].created_at).toBeDefined();
    expect(orders[0].updated_at).toBeDefined();
  });

  // ============================================

  it('[GET]  /api/orders', async () => {
    const resp = await request(server).post('/api/auth/login').send({ email: 'josh@josh.com', password: 'josh' });
    const { status, user, token } = resp.body;
    expect(resp.status).toBe(200);

    // try to access orders withOUT token
    const resp1 = await request(server).get('/api/orders');
    expect(resp1.status).toBe(401); // from middleware restricted()

    // try to access orders WITH valid token
    const resp2 = await request(server).get('/api/orders').set('Authorization', token);  // Setting a custom header
    expect(resp2.status).toBe(200);

    // updating the order status changes the orders array indices (i.e., orders[0] will likely not have order.id === 1)
    // -however, since we are re-seeding on every run here, the order.id === 1 should be the first order in the orders array
    const orders = resp2.body;
    // console.log('orders', orders);
    expect(orders[0].id).toBe(1);
    expect(orders[0].status).toBe(1);
    expect(orders[0].user_id).toBe(1);
    // expect(orders[0].total).toBe(100); // NOTE: Seeding total calculation needs to be fixed
    expect(orders[0].uuid).toBeDefined();
    expect(orders[0].created_at).toBeDefined();
    expect(orders[0].updated_at).toBeDefined();
  });

  // ============================================

  it('[POST]  /api/orders/create', async () => {
    
    // create order (does not require token - 'preparing' state requires order have successful credit card transaction)
    const resp0 = await request(server)
      .post('/api/orders')
      .send(
        {
          user_id: 1, 
          order_items: [
            { product_id: 1, quantity: 2 },
            { product_id: 2, quantity: 2 },
          ] // order_items
        } // req.body
      );
    expect(resp0.status).toBe(201); // 201 - Created
    // -After successful creation of order in DB the stripe URL is returned to the frontend.
    // -The frontend then redirects the user to the stripe URL to complete the transaction.
      
    const resp1 = await request(server).post('/api/auth/login').send({ email: 'josh@josh.com', password: 'josh' });
    const { status, user, token } = resp1.body;
    expect(resp1.status).toBe(200);

    // try to access orders with token
    const resp2 = await request(server).get('/api/orders').set('Authorization', token);  // Setting a custom header
    expect(resp2.status).toBe(200);

    // updating the order status changes the orders array indices (i.e., orders[0] will likely not have order.id === 1)
    // -however, since we are re-seeding on every run here, the order.id === 1 should be the first order in the orders array
    const orders = resp2.body;
    console.log('orders', orders);
    expect(orders[3].id).toBe(4); // assumes 3 orders created during seeding
    expect(orders[3].status).toBe(1); // assumes order is in 1='pending' state (i.e., credit card transaction has not been completed)
    expect(orders[3].user_id).toBe(1);
    // expect(orders[0].total).toBe(100); // NOTE: Seeding total calculation needs to be fixed
    expect(orders[3].uuid).toBeDefined();
    expect(orders[3].created_at).toBeDefined();
    expect(orders[3].updated_at).toBeDefined();
  });

  // ============================================

  // TODO: Test getFiltered()
  // it('[POST]  /api/orders/get-filtered', async () => {
  //   const resp = await request(server).post('/api/auth/login').send({ email: 'josh@josh.com', password: 'josh' });
  //   const { status, user, token } = resp.body;
  //   expect(resp.status).toBe(200);

  //   // try to access orders withOUT token
  //   const resp1 = await request(server).get('/api/orders')
  //   expect(resp1.status).toBe(401); // from middleware restricted()

  // NOTE: need to create an order in order to get the time rnage for filtering
  // NOTE: need to create an order in order to get the time rnage for filtering
  // NOTE: need to create an order in order to get the time rnage for filtering
  // NOTE: need to create an order in order to get the time rnage for filtering
  // NOTE: need to create an order in order to get the time rnage for filtering
  // NOTE: need to create an order in order to get the time rnage for filtering
  // NOTE: need to create an order in order to get the time rnage for filtering
  // NOTE: need to create an order in order to get the time rnage for filtering

  //   // try to access orders WITH valid token
  //   const resp2 = await request(server)
  //     .post('/api/orders')
  //     .send({  })
  //     .set('Authorization', token)  // Setting a custom header
  //   expect(resp2.status).toBe(200);

  //   // updating the order status changes the orders array indices (i.e., orders[0] will likely not have order.id === 1)
  //   // -however, since we are re-seeding on every run here, the order.id === 1 should be the first order in the orders array
  //   const orders = resp2.body;

  // });

  // ============================================

});
