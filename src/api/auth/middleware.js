const jwt = require('jsonwebtoken');
const { HttpError, DatabaseError } = require('../../util/error');

// ==============================================

exports.restricted = (req, res, next) => {
  // the server expects to find the token in the request header Authorization
  const token = req.headers.authorization; // req.headers.authorization is set even though Authorization:abcdef is sent as header when making request.

  // console.log('(middleware restricted() - req.headers.authorization: ', req.headers.authorization);

  if (!token) 
    return next(new HttpError('Unauthorized - must be logged in!', 401));

  const token_secret = process.env.TOKEN_SECRET;

  // async verify (with old-school node async callback style)
  // -callback is used to handle success or failure
  jwt.verify(
    token,
    token_secret,
    (err, decoded_token) => {
      if (err)
        return next(new HttpError('Unauthorized - invalid JWT!', 401));

      // -Token is valid  =>  move along!
      res.locals.decoded_token = decoded_token;
      next();
    }
  );

};

// ==============================================

exports.admin = (req, res, next) => {
  // console.log('(middleware) admin() - res.locals.decoded_token: ', res.locals.decoded_token);

  // console.log('req.decoded_token: ', req.decoded_token);
  if (!res.locals.decoded_token.is_admin)
    return next(new HttpError('Unauthorized - admin only!', 401));
    
  // -user is admin  =>  move along!
  next(); 
};

// ==============================================

exports.checkAuthPayload = (req, res, next) => {
  const { username, password } = req.body;
  const valid = Boolean(username && password && typeof password === 'string');

  if (valid) {
    next();
  } else {
    next({
      status: 422,
      message:
        'Error 422: Unprocessable Entity. Please provide username and password and the password shoud be alphanumeric',
    });
  }
};

// ==============================================

// module.exports =  { checkAuthPayload, restricted, admin };
// export default { checkAuthPayload, restricted, admin_only };
