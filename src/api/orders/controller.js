const Model = require('./model');
const { asynch } = required('util/async');
const { HttpError, DatabaseError } = required('util/error');

// ==============================================

exports.get = async (req, res) => {

  console.log('[GET] /api/orders');

  const promise = Model.getAll();
  const [orders, error] = await asynch(promise);
  if (error) return next(new DatabaseError(error, '/src/api/orders/controller.js -- Model.getAll()'));

  res.status(200).json( orders )
};

// ==============================================