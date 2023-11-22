const db = required('db/db');

// ==============================================

exports.getAll = () => {
  // return db('apnts')
  //   .select('user_id', 'apnt_type_id', 'date_time')
  //   .orderBy('id');

  return db('apnt_types')
  .join('apnts', 'apnt_types.id', 'apnts.apnt_type_id')
  .join('users', 'users.id', 'apnts.user_id')
  .select(
    'apnt_types.name as type',
    'apnts.date_time as date_time',
    'apnt_types.price as price',
    'apnts.user_id as user_id',
    'users.first_name as first_name',
    'users.last_name as last_name',
    'users.email as email',
  );
  // .where('o2p.order_id', order_id);
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
  // return db('apnts')
  //   .select('user_id', 'apnt_type_id', 'date_time')
  //   .where('date_time', date_time);
  return db('apnt_types')
  .join('apnts', 'apnt_types.id', 'apnts.apnt_type_id')
  .join('users', 'users.id', 'apnts.user_id')
  .select(
    'apnt_types.name as type',
    'apnts.date_time as date_time',
    'apnt_types.price as price',
    'apnts.user_id as user_id',
    'users.first_name as first_name',
    'users.last_name as last_name',
    'users.email as email',
  )
  .where('date_time', date_time);
}

// ==============================================