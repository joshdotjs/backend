const db = required('db/db');

// ==============================================

async function getAll() {
  return db('orders');
}

// ==============================================

module.exports = {
  getAll,
};
