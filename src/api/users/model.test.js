require('../../util/path');
const request = require('supertest');
const server = require('../../server');
const db = required('db/db');
const { hash } = required('util/hash');

const UsersModel = require('./model');

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

describe('Model - Users', () => {
  // ============================================

  it('getAllUsers() should return user ID 1', async () => {
    // async function getAllUsers() { return db('users') };
    const users = await UsersModel.getAll();
    expect(users[0].id).toBe(1);
  });

  // ============================================

  it('getByEmail(user) with email not in DB should fail', async () => {
    const email = 'y@y.com'; //'josh@josh.com';
    const users = await UsersModel.getByEmail(email);
    expect(users[0]).toBe(undefined);
  });

  // ============================================

  it('getByEmail(user) with email not in DB should fail', async () => {
    const email = 'josh@josh.com';
    const users = await UsersModel.getByEmail(email);
    // {
    //   id: 1,
    //   email: 'josh@josh.com',
    //   password: '$2a$08$Yvcc7Kf4xpovNutrTrXDreGL.ujwOdPpEy9mXfhsxOqYqx0fwcbB.',
    //   is_admin: true,
    //   first_name: 'josh',
    //   last_name: 'holloway',
    //   created_at: 2023-10-05T00:39:27.702Z,
    //   updated_at: 2023-10-05T00:39:27.702Z
    // }

  
    expect(users[0].id).toBe(1);
    expect(users[0].email).toBe('josh@josh.com');
    expect(users[0].is_admin).toBe(true);
    // console.log('hash(josh): ', hash('josh'));
    // console.log('users[0].password: ', users[0].password);
    expect(users[0].first_name).toBe('josh');
    expect(users[0].last_name).toBe('holloway');
  });

  // ============================================

});
