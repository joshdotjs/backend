const Model = require('./model');
const { asynch } = required('util/async');
const { HttpError, DatabaseError } = required('util/error');

// ==============================================

exports.get = async (req, res) => {
  // console.log('[GET] /api/orders');
  const promise = Model.getAll();
  const [orders, error] = await asynch(promise);
  if (error) return next(new DatabaseError(error, '/src/api/orders/controller.js -- Model.getAll()'));
  res.status(200).json( orders )
};

// ==============================================

exports.create = async (req, res, next) => {
  console.log('[POST] /api/users ');
  console.log('req.body: ', req.body);

  const { email, password, is_admin } = req.body;

  if ( !email || !password || is_admin === undefined ) {
    const error_message = 'username, password, and is_admin are required';
    console.magenta(error_message);
    console.blue('throwing error...');
    // const error = new Error(error_message);
    // error.status = 422;
    // next(error);
    return next(new HttpError(error_message, 422, '/src/api/users/controller.js -- create()'));
  }

  // const created_user = await Model.create({
  //   email,
  //   is_admin,
  //   password: hash(password),
  // });
  // res.status(201).json( created_user );
  const promise = Model.create({
    email,
    is_admin,
    password: hash(password),
  });
  const [data, error] = await asynch(promise);
  if (error) return next(new DatabaseError(error, '/src/api/users/controller.js -- Model.create()'));

  const [created_user] = data;
  res.status(201).json( created_user );
};

// ==============================================