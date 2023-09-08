exports.up = async (knex) => { 
  
  // --------------------------------------------
  
  await knex.schema.createTable('users', (tbl) => {
      tbl.increments('id');
      tbl.string('email', 200).notNullable();
      tbl.string('password', 200).notNullable();
      tbl.boolean('is_admin');
      tbl.timestamps(false, true);
    });

  // --------------------------------------------

};

// ==============================================

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users');
};