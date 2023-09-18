const Model = require('./model');
const { hash } = required('util/hash');
const { HttpError } = required('util/error');

// 422: Unprocessable Entity
//  -The request structure is correct but the data 
//   itself is invalid due to missing required fields 
//   like email or password.

// ==============================================

exports.get = async (req, res) => {

  console.log('[GET] /api/users ');

  // async function getAllUsers() { return db('users') };
  // const users = await getAllUsers();
  const users = await Model.getAll();

  res.status(200).json( users )
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
    return next(new HttpError(error_message, 422));
  }

  const created_user = await Model.create({
    email,
    is_admin,
    password: hash(password),
  });
  res.status(201).json( created_user );
};

// ==============================================

exports.getByID = async (req, res) => {

  const id = req.params.id;

  console.log('[GET] /api/users/:id -- user_id: ', id);

  // -A logged in user can get info on themselves, but no other user.
  //  => Ensure that user_id is the same ID as the user sending the request.
  //  => compare user_id to the user-id encoded in the JWT.
  // console.log('res.locals.decoded_token: ', res.locals.decoded_token);

  if ( id == res.locals.decoded_token.id ) {
    try {
      const user = await Model.getById(id);
      if (user.length > 0) {
        res.status(200).json({ user: user[0] });
      } else {
        // next(new HttpError('user does not exist in database', 400));
        res.status(401).json({ message: 'ERROR 400: user does not exist in database'});
      }
    } catch (err) {
      // next(new HttpError('error looking up user by user_id', 400));
      res.status(400).json({ message: 'ERROR 400: Bad request'});
    }
  } else {
    res.status(401).json({ message: 'ERROR 401: Unauthorized. Users can only access their own account. You are trying to access a user account different than your own.'});
  }
};

// ==============================================

exports.deleteByID = async (req, res, next) => {
  
  const id = req.params.id;
  const str = `[DELETE] /api/users/:id -- user_id: ${id}`;
  console.red(str);

  const num_rows_deleted = await Model.remove(id);
  if (num_rows_deleted === 0) {
    return next(new HttpError('user does not exist in database', 404));
  } 
  res.status(200).json( num_rows_deleted );
};

// ==============================================

exports.update = async (req, res, next) => {

  const id = req.params.id;
  const str = `[PUT]  /api/users/:${id}`;
  console.log(str);

  const user = req.body;
  console.log('user: ', user);

  const num_rows_updated = await Model.update(user, id);
  if (num_rows_updated === 0) {
    return next(new HttpError('user does not exist in database', 404));
  } 
  res.status(200).json( num_rows_updated );
};

// ==============================================