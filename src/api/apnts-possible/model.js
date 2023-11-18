const db = required('db/db');

// ==============================================

exports.getAll = () => {
  return db('apnts_possible')
    .select('date_time', 'possible')
    .orderBy('date_time');
}

// ==============================================

exports.update = (date_time, possible) => {
  // const [created_apnt_obj] = await db('apnts').insert(data, []);
  // return db('apnts-possible').insert(data, [
  //   'date_time',
  // ]);
  return db('apnts_possible')
    .where('date_time', '=', date_time) // Specific date and time
    .update({
      possible: possible
    })
    .orderBy('id');
}

// ==============================================