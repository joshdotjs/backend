// const db = require('../../db/db');
const db = required('db/db');
const { truncateStringFront } = required('util/string');

// ==============================================

async function getAll() {

  const users = await db('users');

  const mapped = users.map((user) => ({
    ...user,
    password: truncateStringFront({ str: user.password }),
  }));

  return mapped;
}

// ==============================================

function getByEmail(email) {
  return db('users').where('email', email);
}

// ==============================================

function getById(id) {
  return db('users').where('id', id);
}

// ==============================================

async function insert(user) {
  const [newUserObject] = await db('users').insert(user, [
    'id',
    'email',
    'password',
    'is_admin',
  ]);
  return newUserObject;
}

// ==============================================

async function remove(id) {
  console.log('remove()');
  const to_be_deleted = await getById(+id);
  console.log('users Model --> to_be_deleted: ', to_be_deleted);
  await db('users').where('id', +id).del();
  return to_be_deleted;
}

// ==============================================

async function update(user) {

  console.log('model :: update() -- user: ', user);

  const num_rows_updated = await db('users')
    .where('id', +user.id)
    .update(user);

  const [updated_user] = await getById(+user.id);

  return updated_user;
}

// ==============================================

module.exports = {
  getAll,
  getByEmail,
  getById,
  insert,
  remove,
  update,
};
