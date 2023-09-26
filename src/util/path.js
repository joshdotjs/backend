const path = require('path');

// ==============================================

const __ROOT_PATH__ = path.join(__dirname, '..', '..');  // Path of /     =>  /Users/josh/dev/PostgreSQL
const __SRC_PATH__  = path.join(__dirname, '..');        // Path of /src  =>  /Users/josh/dev/PostgreSQL/src

// ==============================================

// This is the path relative to the /src directory
const srcPath = (str) => {
  // Ex:  filePath('db/db')  =>   /src/db/db.js
  return path.join(__SRC_PATH__, str);
};

// ==============================================

// This is the path relative to the /src directory
const rootPath = (str) => {
  // Ex:  filePath('db/db')  =>   /src/db/db.js
  return path.join(__ROOT_PATH__, str);
};

// ==============================================

// This includes the file relative to the /src directory
const required = (str) => {
  // Ex:  required('db/db')  =>   require('../../db/db.js');
  return require( srcPath(str) );
};

// ==============================================

global.required = required;
global.rootPath = rootPath;

// ==============================================

const env = required('util/env');
global.env = env;

// ==============================================

module.exports = {
  rootPath,
}; 