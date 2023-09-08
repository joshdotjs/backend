const db = require('../../db/db');

// ==============================================

async function getAll() {
  return await db('sigs');
}

// ==============================================

// TODO: Get Sig by Email

// ==============================================

// TODO: Get Sig by ID

// ==============================================

// TODO: Insert Sig

async function insert({ email, first_name, last_name }) {
  const [ new_sig_obj ] = await db('sigs').insert(
    { email, first_name, last_name}, 
    ['id', 'email', 'first_name', 'last_name']
  );
  return new_sig_obj;
}

// ==============================================

// TODO: Update Sig

// ==============================================

// TODO: Detete Sig

// ==============================================

module.exports = {
  getAll,
  insert,
};
