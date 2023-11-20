const Model = require('./model');

const { asynch } = required('util/async');
const { HttpError, DatabaseError } = required('util/error');

// ==============================================

exports.get = async (req, res, next) => {
  console.log('[GET] /api/apnt-types');
  const [apnt_types, error] = await asynch( Model.getAll() );
  if (error)
    return next(new DatabaseError(error, '/src/api/apnt-types/controller.js -- Model.getAll()'));

  console.log('apnt_types: ', apnt_types);
  res.status(200).json(apnt_types);
};

// ==============================================

exports.create = async (req, res, next) => {
  console.log('[POST] /api/apnt-types ');
  console.log('req.body: ', req.body);

  const { name, price } = req.body;

  if ( name === undefined || price === undefined ) {
    const error_message = 'name and price are required';
    console.magenta(error_message);
    return next(new HttpError(error_message, 422, '/src/api/apnt-types/controller.js -- create()'));
  }

  const promise = Model.create({ name, price });
  const [data, error] = await asynch( promise );
  if (error) return next(new DatabaseError(error, '/src/api/apnt-types/controller.js -- Model.create()'));

  const [created_apnt_type] = data;
  res.status(201).json( created_apnt_type );
};

// ==============================================

exports.getByID = async (req, res) => {

  const id = req.params.id;

  console.log('[GET] /api/apnt-types/:id -- id: ', id);

  
  const promise = Model.getById(id);
  const [apnt_type, error] = await asynch( promise );
  if (error) return next(new HttpError('error looking up apnt_type by id', 400));

  if (apnt_type.length > 0) {
    res.status(200).json( apnt_type[0] );
  } else {
    next(new HttpError('apnt_type does not exist in database', 400));
  }

};

// ==============================================