const { defineConfig } = require("cypress");
const { Client } = require('pg');
const path = require('path');

console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
console.log('JOSH');
require("dotenv").config();
console.log(process.env.DB_USER);
console.log(__filename);
require(path.join(__dirname, 'src', 'util', 'path.js'));
required('util/console');

console.magenta('josh');
const db = required('db/db');


// step 1: get .env working
// step 2: do the db.js code in here 


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        async connectDB(query){
          const client = new Client({
            user: process.env.DB_USER,
            password: process.env.DB_PW,
            host: process.env.DB_HOST,
            database: process.env.DB_TEST_DATABASE_NAME,
            ssl: false,
            port: 5432
          });
          await client.connect();
          // const res = await client.query('SELECT NOW()')
          const res = await client.query(query);
          await client.end();
          return res.rows;
        },
        async josh() {
          return 'INSIDE JOSH';
        },
        // async rollback() {
        //   await db.migrate.rollback();
        //   return 'rollback()';
        // }
      });
    },
  },
});
