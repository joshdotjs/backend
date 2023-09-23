require('dotenv').config(); // this file runs outside of index.js when we run migrations
require('./src/util/console');
// console.magenta('knexfile.js');

// ==============================================

const NODE_ENV = process.env.NODE_ENV ?? 'development';
// console.log('NODE_ENV: ', NODE_ENV);

// ==============================================

let DB_URL; 
if (NODE_ENV === 'production') {
  DB_URL = process.env.DATABASE_URL; // heroku
} 

// TODO: Enable Testing DB HERE
// TODO: Enable Testing DB HERE
// TODO: Enable Testing DB HERE
// TODO: Enable Testing DB HERE
// TODO: Enable Testing DB HERE
// TODO: Enable Testing DB HERE
// TODO: Enable Testing DB HERE
// TODO: Enable Testing DB HERE
// TODO: Enable Testing DB HERE

// else if (NODE_ENV === 'testing') {
//   DB_URL = process.env.TESTING_DATABASE_URL; // .env
// } 
else {
  DB_URL = process.env.DEV_DATABASE_URL; // .env
}

// console.log('DB_URL: ', DB_URL);

// ==============================================

/*
  .env:
    PORT=9000
    NODE_ENV=development
    DEV_DATABASE_URL=postgresql://postgres:password@localhost:5432/database_name
    TESTING_DATABASE_URL=postgresql://postgres:password@localhost:5432/testing_database_name

  Put the above in your .env file. Some adjustments in the connection URLs will be needed:

    - 5432 (this is the default TCP port for PostgreSQL, should work as is)
    - postgres (in postgres:password, this is the default superadmin user, might work as is)
    - password (in postgres:password, replace with the actual password of the postgres user)
    - database_name (use the real name of the development database you created in pgAdmin 4)
    - testing_database_name (use the real name of the testing database you created in pgAdmin 4)

  package.json:
    "migrateh": "heroku run knex migrate:latest -a <HEROKU-PROJECT-NAME>",
    "rollbackh": "heroku run knex migrate:rollback -a <HEROKU-PROJECT-NAME>",
    "seedh": "heroku run knex seed:run -a <HEROKU-PROJECT-NAME>",
    "databaseh": "heroku pg:psql -a <HEROKU-PROJECT-NAME>",
*/


// ==============================================

const pg = require('pg');
if (NODE_ENV === 'production') {
  pg.defaults.ssl = { rejectUnauthorized: false };
}

// ==============================================

const sharedConfig = {
  client: 'pg',
  migrations: { directory: './src/db/migrations' },
  seeds: { directory: './src/db/seeds' },
  connection: DB_URL, 
};

// ==============================================

module.exports = {
  development: sharedConfig,
  testing: sharedConfig,
  production: {
    ...sharedConfig,
    pool: { min: 2, max: 10 },
  },
};