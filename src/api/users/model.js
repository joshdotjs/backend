// const db = require('../../db/db');
const db = required('db/db');

// ==============================================

async function getAll() {
  return db('users');
}

// ==============================================

exports.getByEmail = async (email) => {
  return db('users').where('email', email);
}

// ==============================================

exports.getById = async (id) => {
  return db('users').where('id', id);
}

// ==============================================

exports.create = async (user) => {
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

exports.remove = async (id) => {
  console.log('remove()');
  const num_rows_deleted = await db('users').where('id', +id).del();
  return num_rows_deleted;
}

// ==============================================

exports.update = async (user, id) => {

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

exports.getByEmail = async (email) => {
  console.log('model  --  getUserByEmail( email ) ');
  return db('users')
    .where('email', email);
};

// ==============================================