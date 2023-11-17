const Model = require('./model');

const { asynch } = required('util/async');
const { HttpError, DatabaseError } = required('util/error');

// ==============================================

exports.get = async (req, res, next) => {
  console.log('[GET] /api/apnts-possible');
  const [apnts, error] = await asynch( Model.getAll() );
  if (error)
    return next(new DatabaseError(error, '/src/api/apnts-possible/controller.js -- Model.getAll()'));
  res.status(200).json(apnts);
};

// ==============================================

exports.update = async (req, res, next) => {
  console.log('[POST] /api/apnts-possible ');
  console.log('req.body: ', req.body);

  const {date_times } = req.body;
  console.log('date_times: ', date_times);

  if ( date_times === undefined ) {
    const error_message = 'date_times are required';
    console.magenta(error_message);
    return next(new HttpError(error_message, 422, '/src/api/apnts-possible/controller.js -- create()'));
  }

  for (let i = 0; i < date_times.length; i++) {
    const promise = Model.update(date_times[i]);
    const [data, error] = await asynch(promise);
    if (error) return next(new DatabaseError(error, '/src/api/apnts-possible/controller.js -- Model.create()'));
  }

  res.status(201).json({ message: 'success' });
};

// ==============================================
