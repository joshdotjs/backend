require('../../util/path');
const request = require('supertest');
const server = require('../../server');
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

describe('Routes - Products', () => {

  // ============================================

  it('[GET] /products route should succeed', async () => {
    const resp = await request(server).get('/api/products');
    expect(resp.status).toBe(200);

    // {
    //     "id": 1,
    //     "uuid": "b918f35892c4",
    //     "title": "Hamburger",
    //     "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/800px-RedDot_Burger.jpg",
    //     "description": "A hamburger is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun.",
    //     "category": "food",
    //     "status": "available",
    //     "published": true,
    //     "price": 100,
    //     "units_in_stock": 100,
    //     "image_alt": "A hamburger",
    //     "details_route": "/products/hamburger",
    //     "created_at": "2023-10-05T00:39:27.705Z",
    //     "updated_at": "2023-10-05T00:39:27.705Z"
    // },
    const { id, uuid, title, image_url, description, category, status, published, price, units_in_stock, image_alt, details_route, created_at, updated_at } = resp.body[0];
    expect(id).toBe(1);
    expect(typeof uuid).toBe('string');
    expect(uuid.length).toBe(12);
    expect(title).toBe('Hamburger');
    expect(image_url).toBe('https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/800px-RedDot_Burger.jpg');
    expect(description).toBe('A hamburger is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun.');
    expect(category).toBe('food');
    expect(status).toBe('available');
    expect(published).toBe(true);
    expect(price).toBe(100);
    expect(units_in_stock).toBe(100);
    expect(image_alt).toBe('A hamburger');
    expect(details_route).toBe('/products/hamburger');
    expect(typeof created_at).toBe('string');
    expect(typeof updated_at).toBe('string');
  });

  // ============================================

});
