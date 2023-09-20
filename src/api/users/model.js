// const db = require('../../db/db');
const db = required('db/db');

// ==============================================

async function getAll() {
  return db('users');
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

async function create(user) {
  // const [newUserObject] = await db('users').insert(user, [
  //   'id',
  //   'email',
  //   'password',
  //   'is_admin',
  // ]);
  // return newUserObject;
  return db('users').insert(user, [
    'id',
    'email',
    'password',
    'is_admin',
  ]);
}

// ==============================================

async function remove(id) {
  console.log('remove()');
  const num_rows_deleted = await db('users').where('id', +id).del();
  return num_rows_deleted;
}

// ==============================================

async function update(user, id) {

  console.log('model :: update() -- user: ', user);

  const num_rows_updated = await db('users')
    .where('id', +id)
    .update(user);

  // TODO: return num_rows_updated
  // TODO: apply error handling based on if .length === 0
  // TODO: adjust the logic in the backend UI code to handle
  //       not returning updated_user

  // const [updated_user] = await getById(+user.id);

  return num_rows_updated;
}

// ==============================================

module.exports = {
  getAll,
  getByEmail,
  getById,
  create,
  remove,
  update,
};
