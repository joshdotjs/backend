require('dotenv').config(); // this file runs outside of index.js when we run migrations
console.log('knexfile.js - process.env.DEV_DATABASE_URL: ', process.env.DEV_DATABASE_URL);

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
const pg = require('pg')

// ==============================================

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false }
}

// ==============================================

const sharedConfig = {
  client: 'pg',
  migrations: { directory: './src/db/migrations' },
  seeds: { directory: './src/db/seeds' },
}

// ==============================================

module.exports = {
  development: {
    ...sharedConfig,
    connection: process.env.DEV_DATABASE_URL, // .env
  },
  testing: {
    ...sharedConfig,
    connection: process.env.TESTING_DATABASE_URL, // .env
  },
  production: {
    ...sharedConfig,
    connection: process.env.DATABASE_URL, // heroku
    pool: { min: 2, max: 10 },
  },
}
