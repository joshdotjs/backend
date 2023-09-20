const db = required('db/db');

// ==============================================

function getById(id) {
  return db('products').where('id', id);
}
// ==============================================

module.exports = {
  getById,
};
