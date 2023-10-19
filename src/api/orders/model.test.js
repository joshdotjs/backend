require('../../util/path');
const request = require('supertest');
const server = require('../../server');
const db = required('db/db');
const { hash } = required('util/hash');

const OrdersModel = require('./model');

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

  // ============================================

  // it('is the correct testing environment', async () => {
  //   expect(process.env.NODE_ENV).toBe('testing')
  // })
});

// ==============================================
// ==============================================
// ==============================================
// ==============================================

describe('Model - Orders', () => {

  // ============================================

  it('getAll()', async () => {
    const orders = await OrdersModel.getAll();
    console.log('orders: ', orders);
    expect(typeof orders[0].id).toBe('number');
    expect(typeof orders[0].uuid).toBe('string');
    expect(typeof orders[0].status).toBe('number');
    expect(typeof orders[0].user_id).toBe('number');
    expect(typeof orders[0].total).toBe('number');
    expect(typeof orders[0].created_at).toBe('object');
    expect(typeof orders[0].updated_at).toBe('object');
  });

  // ============================================

  it('create( order )', async () => {
    const created_order = await OrdersModel.create({ uuid: 'abc123', user_id: 1, total: 100, status: 1 });
    console.log('created_order: ', created_order);
    expect(created_order[0].id).toBe(4);
    expect(created_order[0].uuid).toBe('abc123');
    expect(created_order[0].user_id).toBe(1);
    expect(created_order[0].total).toBe(100);
    expect(created_order[0].status).toBe(1);
    // NOTE: created_at and updated_at are not returned by this model function
    // expect(created_order[0].created_at).toBeDefined();
    // expect(created_order[0].updated_at).toBeDefined();
  });

  // ============================================

});
