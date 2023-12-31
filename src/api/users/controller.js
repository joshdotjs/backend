const Model = require('./model');
const { hash } = required('util/hash');
const { asynch } = required('util/async');
const { truncateFront } = required('util/string');
const { HttpError, DatabaseError } = required('util/error');

// 422: Unprocessable Entity
//  -The request structure is correct but the data 
//   itself is invalid due to missing required fields 
//   like email or password.

// ==============================================

exports.get = async (req, res) => {
  // console.log('[GET] /api/users ');
  const promise = Model.getAll();
  const [data, error] = await asynch(promise);
  if (error) return next(new DatabaseError(error, '/src/api/users/controller.js -- Model.getAll()'));

  const users = data.map((user) => ({
    ...user,
    password: truncateFront({ str: user.password }),
  }));

  res.status(200).json( users )
};

// ==============================================

exports.create = async (req, res, next) => {
  console.log('[POST] /api/users ');
  console.log('req.body: ', req.body);

  const { email, password, first_name, last_name } = req.body;

  if ( !email || !password ) {
    const error_message = 'username and password are required';
    console.magenta(error_message);
    console.blue('throwing error...');
    return next(new HttpError(error_message, 422, '/src/api/users/controller.js -- create()'));
  }

  const promise = Model.create({
    email,
    first_name,
    last_name,
    is_admin: false, // don't need to create new admin accounts via API
    password: hash(password),
  });
  const [data, error] = await asynch(promise);
  if (error) return next(new DatabaseError(error, '/src/api/users/controller.js -- Model.create()'));

  const [created_user] = data;
  res.status(201).json( created_user );
};

// ==============================================

exports.getByID = async (req, res) => {

  const id = req.params.id;

  // console.log('[GET] /api/users/:id -- user_id: ', id);

  // -A logged in user can get info on themselves, but no other user.
  //  => Ensure that user_id is the same ID as the user sending the request.
  //  => compare user_id to the user-id encoded in the JWT.
  // console.log('res.locals.decoded_token: ', res.locals.decoded_token);

  // if ( id == res.locals.decoded_token.id ) {
  try {
    const user = await Model.getById(id);
    if (user.length > 0) {
      res.status(200).json({ user: user[0] });
    } else {
      // res.status(401).json({ message: 'ERROR 400: user does not exist in database'});
      return next(new HttpError('user does not exist in database', 400));
    }
  } catch (err) {
    // res.status(400).json({ message: 'ERROR 400: Bad request'});
    return next(new HttpError('error looking up user by user_id', 400));
  }
  // } else {
  //   res.status(401).json({ message: 'ERROR 401: Unauthorized. Users can only access their own account. You are trying to access a user account different than your own.'});
  // }
};

// ==============================================

exports.deleteByID = async (req, res, next) => {
  
  const id = req.params.id;
  // const str = `[DELETE] /api/users/:id -- user_id: ${id}`;
  // console.red(str);

  const num_rows_deleted = await Model.remove(id);
  if (num_rows_deleted === 0) {
    return next(new HttpError('user does not exist in database', 404));
  } 
  res.status(200).json( num_rows_deleted );
};

// ==============================================

exports.update = async (req, res, next) => {

  const id = req.params.id;
  // const str = `[PUT]  /api/users/:${id}`;
  // console.log(str);

  const user = req.body;
  console.log('user: ', user);

  const num_rows_updated = await Model.update(user, id);
  if (num_rows_updated === 0) {
    return next(new HttpError('user does not exist in database', 404));
  } 
  res.status(200).json( num_rows_updated );
};

// ==============================================