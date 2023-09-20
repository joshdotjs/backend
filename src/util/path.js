const path = require('path');

// ==============================================

const __ROOT_PATH__ = path.join(__dirname, '..', '..'); // Path of /     =>  /Users/josh/dev/PostgreSQL
const __SRC_PATH__  = path.join(__dirname, '..');        // Path of /src  =>  /Users/josh/dev/PostgreSQL/src

// ==============================================

// This is the path relative to the /src directory
const filePath = (str) => {
  // Ex:  filePath('db/db')  =>   /src/db/db.js
  return path.join(__SRC_PATH__, str);
};

// ==============================================

// This includes the file relative to the /src directory
const required = (str) => {
  // Ex:  required('db/db')  =>   require('../../db/db.js');
  return require( filePath(str) );
};

// ==============================================

global.__ROOT_PATH__ = __ROOT_PATH__;
global.required = required;

// ==============================================

module.exports = {
  filePath,
  required,
}; 