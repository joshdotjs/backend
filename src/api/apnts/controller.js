const Model = require('./model');

const { asynch } = required('util/async');
const { HttpError, DatabaseError } = required('util/error');

// ==============================================

exports.get = async (req, res, next) => {
  console.log('[GET] /api/apnts');
  const [apnts, error] = await asynch( Model.getAll() );
  if (error)
    return next(new DatabaseError(error, '/src/api/apnts/controller.js -- Model.getAll()'));
  res.status(200).json(apnts);
};

// ==============================================

exports.create = async (req, res, next) => {
  console.log('[POST] /api/apnts ');
  console.log('req.body: ', req.body);

  const { user_id, date_time } = req.body;

  if ( user_id === undefined || date_time === undefined ) {
    const error_message = 'user_id and date_time are required';
    console.magenta(error_message);
    return next(new HttpError(error_message, 422, '/src/api/apnts/controller.js -- create()'));
  }

  const promise = Model.create({
    user_id,
    date_time,
  });
  const [data, error] = await asynch(promise);
  if (error) return next(new DatabaseError(error, '/src/api/apnts/controller.js -- Model.create()'));

  const [created_apnt] = data;
  res.status(201).json( created_apnt );
};

// ==============================================
