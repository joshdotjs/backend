require("dotenv").config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const body_parser = require('body-parser');
const path = require('path');
const { filePath } = required('util/path');
const { HttpError, ValidationError, DatabaseError } = required('util/error');

// ==============================================

const server = express();

// server.set('views', path.join(__dirname, '..', 'views'));
server.set('views', filePath('views')); //  /src/views
server.set('view engine', 'ejs');

// ==============================================

server.use(express.json()); // Parses incoming request bodies in JSON format.
// -When the server receives a request, 
//  this middleware will automatically 
//  take care of converting the JSON payload 
//  into a JavaScript object, which can then 
//  be easily used in the subsequent parts 
//  of the app.

server.use(body_parser.urlencoded({ extended: false })); // handle URL-encoded data.
// -Uses the body-parser package to parse 
//  incoming request bodies before your 
//  handlers (routes) get executed. 
// -This middleware is essential when you're 
//  dealing with forms that submit data to 
//  the server as URL-encoded data.
// -We can then extract the form data
//  from the POST request via req.body

server.use(express.static( filePath('../public') ));

const compression = require('compression');
server.use(compression()); // image files are not compressed

// const morgan = require('morgan');
// server.use(morgan());
// const fs = require('fs');
// const access_log_stream = fs.createWriteStream(filePath('../access.log', { flags: 'a' })); // append to file
// server.use(morgan('combined', { stream: access_log_stream }));

// ==============================================

server.use(helmet());
server.use(cors());

// ==============================================

const usersRouter = require('./api/users/routes');
server.use('/api/users', usersRouter);

// ==============================================

// Serve HTML pages 
const pagesRouter = require('./pages/routes');
server.use('/', pagesRouter);

// ==============================================

// Catch-All Endpoint
server.use('*', (req, res, next) => {
  next(new HttpError(
    'Route not found 😔', 404,
    'attempted route: ' + req.originalUrl,
  ));
});

// ==============================================

// error-handling middleware
server.use((err, req, res, next) => {
  console.magenta('err (in error-handling middleware)  [server.js]');
  console.cyan(err);

  if (err instanceof ValidationError) {
    console.yellow('Error Type: Validation');
  } else if (err instanceof HttpError) {
    console.yellow('Error Type: HTTP');
  } else if (err instanceof DatabaseError) {
    console.yellow('Error Type: Database');
  } else if (err instanceof TypeError) { // Native
    console.yellow('Error Type: Type');
  } else if (err instanceof RangeError) { // Native
    console.yellow('Error Type: Range');
  } else if (err instanceof ReferenceError) { // Native
    console.yellow('Error Type: Reference');
  } else if (err instanceof SyntaxError) { // Native
    console.yellow('Error Type: Syntax');
  } else if (err instanceof URIError) { // Native
    console.yellow('Error Type: URI');
  }
  
  else { // e instanceof Error or any other derived class not listed
    console.yellow('Error Type: General');
  }

  const status = err?.status ?? 500;
  const message = err?.message ?? 'Server Error';
  const info = err?.info ?? 'none';
  res.status(status).json({ 
    status,
    message, 
    info,
  });
});

// ==============================================

module.exports = server;

// ==============================================