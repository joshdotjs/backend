const db = required('db/db');

// ==============================================

exports.getAll = () => {
  return db('apnts')
    .select('user_id', 'apnt_type_id', 'date_time')
    .orderBy('id');
}

// ==============================================

exports.create = (apnt) => {
  // const [created_apnt_obj] = await db('apnts').insert(apnt, []);
  return db('apnts').insert(apnt, [
    'user_id',
    'apnt_type_id',
    'date_time',
  ]);
}

// ==============================================

exports.getByDateTime = (date_time) => {
  return db('apnts')
    .select('user_id', 'apnt_type_id', 'date_time')
    .where('date_time', date_time);
}

// ==============================================