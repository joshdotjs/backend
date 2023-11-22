const db = required('db/db');

// ==============================================

exports.getAll = () => {
  return db('apnt_types')
    .select('id', 'name', 'price')
    .orderBy('id');
}

// ==============================================

exports.create = (apnt) => {
  // const [created_apnt_obj] = await db('apnts').insert(apnt, []);
  return db('apnt_types').insert(apnt, [
    'name',
    'price',
  ]);
}

// ==============================================

exports.getById = (id) => {
  return db('apnt_types').where('id', id);
}

// ==============================================

exports.update = (id, apnt_type) => {
  return db('apnt_types')
    .where('id', +id)
    .update(apnt_type);
};

// ==============================================

exports.remove = async (id) => {
  const num_rows_deleted = await db('users')
    .where('id', +id)
    .del();
  return num_rows_deleted;
}

// ==============================================