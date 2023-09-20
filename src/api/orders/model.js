const db = required('db/db');

// ==============================================

async function getAll() {
  return db('orders');
}

// ==============================================

async function create(order) {
  return db('orders').insert(order, [
    'id',
    'uuid',
    'user_id',
    'total',
    'status',
  ]);
}

// ==============================================

module.exports = {
  getAll,
  create,
};
