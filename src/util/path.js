const path = require('path');

// const path_obj = path.parse(__dirname);
// const dir = path_obj.dir;
// const required = (x) => require(`${dir}/${x}`);
// console.required = required;

// ==============================================

const root_dir = path.dirname( // returns directory name of a path
  //process.mainModule.filename, // process.mainModule refers to the main module that started the application
  require.main.filename, // process.mainModule is deprecated => use require.main and can safely assume they refer to the same module
);

// ==============================================

const filePath = (str) => {
  // Ex:  filePath('db/db')  =>   /src/db/db.js
  return path.join(root_dir, 'src', str);
};

// ==============================================

const required = (str) => {
  // Ex:  required('db/db')  =>   require('../../db/db.js');
  return require( filePath(str) );
};

// ==============================================

module.exports = {
  filePath,
  required,
}; 