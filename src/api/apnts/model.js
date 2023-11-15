const db = required('db/db');

// ==============================================

exports.getAll = () => {
  return db('apnts').orderBy('id');
}

// ==============================================

exports.create = (user) => {
  // const [created_apnt_obj] = await db('apnts').insert(user, []);
  return db('apnts').insert(user, [
    'user_id',
    'date_time',
  ]);
}

// ==============================================