require("dotenv").config();
const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');
const body_parser = require('body-parser');
const { HttpError, ValidationError, DatabaseError } = required('util/error');
const path = require('path');

// ==============================================

server.set('views', rootPath('src/views')); //  /src/views
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

server.use(express.static( rootPath('public') ));

// const compression = require('compression');
// server.use(compression()); // image files are not compressed

// const morgan = require('morgan');
// server.use(morgan());
// const fs = require('fs');
// const access_log_stream = fs.createWriteStream(filePath('../access.log', { flags: 'a' })); // append to file
// server.use(morgan('combined', { stream: access_log_stream }));

// ==============================================

const cookieParser = require('cookie-parser');
server.use( cookieParser() );

// ==============================================

// session resources:
// 1. udemy
// 2. https://www.npmjs.com/package/connect-session-knex
//      Column    Type                      Modifiers    Storage
//      ------    ----                      ---------    -------
//      sid	      character varying(255)	  not null	   extended
//      sess	    json                      not null     extended
//      expired   timestamp with time zone  not null     plain
//
//    CREATE TABLE your_table_name (
//      sid character varying(255) NOT NULL,
//      sess json NOT NULL,
//      expired timestamp with time zone NOT NULL
//    );
//
// 3: https://github.com/gx0r/connect-session-knex/blob/main/examples/example-postgres.js
// 4. why are cookies not working? https://youtu.be/nfNrfi7HmLs?feature=shared
//    -fix of problem described in (4):  cors 'origin' property set to http://localhost:3000
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const db = required('db/db');
const session_store = new KnexSessionStore({
  knex: db,
  tablename: 'sessions', // optional. Defaults to 'sessions'
});

const session_config = { 
  secret: process.env.SESSION_SECRET,
  resave: false, // session will not be saved on every request
  saveUninitialized: false, // session will not be saved for a request that does not have any data
  store: session_store,
  // cookie: {
  //   httpOnly: true,
  //   maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  //   // secure: true, // only send cookie over https
  // }
};
// if (process.env.NODE_ENV === 'production') {
//   server.set('trust proxy', 1); // trust first proxy - important if sitting behind reverse proxy like NGinx (e.g. heroku)
//   session_config.cookie.secure = true; // serve secure cookies (only allow HTTPS)
// }


server.use(session( session_config ));

// ==============================================

console.log('process.env.FRONTEND_URL: ', );

server.use(helmet());
server.use(cors({ 
  origin: process.env.FRONTEND_URL,
  credentials: true 
}));

// ==============================================

// admin facing non-SPA pages
server.use('/admin',        required('pages/routes'));

// ==============================================

// API
server.use('/api/users',          required('api/users/routes'));
server.use('/api/orders',         required('api/orders/routes'));
server.use('/api/products',       required('api/products/routes'));
server.use('/api/auth',           required('api/auth/routes'));
server.use('/api/apnts',          required('api/apnts/routes'));
server.use('/api/apnts-possible', required('api/apnts-possible/routes'));
server.use('/api/apnt-types',     required('api/apnt-types/routes'));
server.use('/api/messages',       required('api/messages/routes'));

// ==============================================

// SPA pages
server.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public', '_frontend-dist', 'index.html'));
});

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
  // console.magenta('err (in error-handling middleware)  [server.js]');
  // console.cyan(err);

  if (err instanceof ValidationError) {
    console.yellow('Error Type: Validation');
  } else if (err instanceof HttpError) {
    // console.yellow('Error Type: HTTP');
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
