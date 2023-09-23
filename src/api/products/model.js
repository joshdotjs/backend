const db = required('db/db');

// ==============================================

function getAll() {
  return db('products');
}

// ==============================================

function getById(id) {
  return db('products').where('id', id);
}
// ==============================================

module.exports = {
  getAll,
  getById,
};
