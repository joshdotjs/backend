const Model = require('./model');

const { asynch } = required('util/async');
const { HttpError, DatabaseError } = required('util/error');

// ==============================================

exports.get = async (req, res) => {
  // console.log('[GET] /api/products');
  const [products, error] = await asynch( Model.getAll() );
  if (error)
    return next(new DatabaseError(error, '/src/api/products/controller.js -- Model.getAll()'));
  res.status(200).json(products);
};

// ==============================================
