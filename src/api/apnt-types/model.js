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

exports.update = (id, apnt_type) => { // resolves to num-rows updated
  return db('apnt_types')
    .where('id', +id)
    .update(apnt_type);
};

// ==============================================

exports.delete = async (id) => { // resolves to num-rows deleted
  return db('apnt_types')
    .where('id', +id)
    .del();
}

// ==============================================