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