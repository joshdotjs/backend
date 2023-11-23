const Model = require('./model');

const { asynch } = required('util/async');
const { HttpError, DatabaseError } = required('util/error');

// ==============================================

exports.get = async (req, res, next) => {
  console.log('[GET] /api/messages');
  const [messages, error] = await asynch( Model.getAll() );

  console.log('messages: ', messages);

  if (error)
    return next(new DatabaseError(error, '/src/api/messages/controller.js -- Model.getAll()'));
  res.status(200).json(messages);
};

// ==============================================

exports.create = async (req, res, next) => {
  console.log('[POST] /api/messages ');
  console.log('req.body: ', req.body);

  const { message } = req.body;
  const { id: user_id } = res.locals.decoded_token;

  if ( user_id === undefined || message === undefined ) {
    const error_message = 'user_id and message are required';
    console.magenta(error_message);
    return next(new HttpError(error_message, 422, '/src/api/messages/controller.js -- create()'));
  }

  const promise = Model.create({
    user_id,
    message,
  });
  const [data, error] = await asynch(promise);
  if (error) 
    return next(new DatabaseError(error, '/src/api/messages/controller.js -- Model.create()'));

  const [created_message] = data;
  res.status(201).json( created_message );
};

// ==============================================

exports.getByUserID = async (req, res, next) => {
  
  const { id } = req.params;
  console.log('[GET] /api/messages/user/:id -- id: ', id);

  const promise = Model.getByUserID(id);
  const [rows, error] = await asynch(promise);
  if (error) 
    return next(new HttpError('error looking up messages by user_id', 400));

  if (rows.length === 0)
    return next(new HttpError('no messages in DB for this user', 400));

  res.status(200).json( rows );
};