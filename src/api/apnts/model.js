const db = required('db/db');

// ==============================================

exports.getAll = () => {
  return db('apnts')
    .select('user_id', 'date_time')
    .orderBy('id');
}

// ==============================================

exports.create = (apnt) => {
  // const [created_apnt_obj] = await db('apnts').insert(apnt, []);
  return db('apnts').insert(apnt, [
    'user_id',
    'date_time',
  ]);
}

// ==============================================