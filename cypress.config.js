const { defineConfig } = require("cypress");
const { Client } = require('pg');
const path = require('path');

require("dotenv").config();
require(path.join(__dirname, 'src', 'util', 'path.js'));
required('util/console');
const db = required('db/db');

// ==============================================
// ==============================================
// ==============================================
// ==============================================

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        // ======================================
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
        // ======================================
        async resetDB() {
          console.yellow('rolling back...');
          await db.migrate.rollback();

          console.magenta('migrating...');
          await db.migrate.latest();

          console.blue('seeding...');
          await db.seed.run();

          console.green('DB has been reset! 😊');

          return 'resetDB() complete';
        }
        // ======================================
      });
    },
  },
});
