const db = required('db/db');

// ==============================================

exports.getAll = () => {
  return db('apnts_possible').orderBy('id');
}

// ==============================================

exports.update = (date_time) => {
  // const [created_apnt_obj] = await db('apnts').insert(data, []);
  // return db('apnts-possible').insert(data, [
  //   'date_time',
  // ]);
  return db('apnts_possible')
    .where('date_time', '=', date_time) // Specific date and time
    .update({
      possible: true
    });
}

// ==============================================