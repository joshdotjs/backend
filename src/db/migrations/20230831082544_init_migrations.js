exports.up = async (knex) => { 
  
  // --------------------------------------------
  
  await knex.schema.createTable('users', (tbl) => {
    tbl.increments('id');
    tbl.string('email', 200).notNullable();      // TODO: Handle same email / empty email
    tbl.string('password', 200).notNullable();   // TODO: Handle empty password
    tbl.boolean('is_admin');
    tbl.string('first_name', 200)//.notNullable();
    tbl.string('last_name', 200)//.notNullable();
    tbl.timestamps(false, true);
  });

  // --------------------------------------------

  await knex.schema.createTable('products', (tbl) => {
    tbl.increments('id');
    tbl.string('uuid');

    tbl.string('title', 1024).notNullable();
    tbl.string('image_url', 1024);

    tbl.string('description', 3200);
    tbl.string('category', 512);

    tbl.string('status', 512);
    tbl.boolean('published');

    // DOES NOT MAKE SENSE - MOVE TO VARIANT:
    tbl.integer('price').unsigned(); // TODO: remove price on product - only need price for variant - creates redundant price field when joining and this one gets overwritten!
    tbl.integer('units_in_stock').unsigned(); // DOES NOT MAKE SENSE - MOVE TO VARIANT

    tbl.string('image_alt', 512);
    tbl.string('details_route', 512);
    tbl.timestamps(false, true);
  });

  // --------------------------------------------

  await knex.schema.createTable('orders', (tbl) => {
    tbl.increments('id');
    tbl.string('uuid');
    tbl.integer('total').notNullable(); // Need sub_total because if price of product changes after placing order then we charge the price of the product when order was placed.  Same is true for tax.  If we calculated total based on current price of products then order history totals would be wrong.  It is okay if product prices in order history are wrong, since the user should only be concerned with how much they actually paid.
    tbl.integer('status');

    // -Foreign-key (Users)
    tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    tbl.timestamps(false, true);
  });

  // --------------------------------------------

  await knex.schema.createTable('order_2_product', (tbl) => {
    // -Primary-key
    tbl.increments('id');

    tbl.integer('quantity').notNullable();

    // -Foreign-key (Products)
    tbl
      .integer('product_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE') // vs. RESTRICT
      .onUpdate('CASCADE');

    // -Foreign-key (Orders)
    tbl
      .integer('order_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('orders')
      .onDelete('CASCADE') // vs. RESTRICT
      .onUpdate('CASCADE');
  });

  // --------------------------------------------
  
  await knex.schema.createTable('apnts', (tbl) => {
    tbl.increments('id');
    tbl.dateTime('date_time', 200).notNullable();
    tbl // -Foreign-key (Users)
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
      
    tbl.timestamps(false, true);
  });

  // --------------------------------------------

};

// ==============================================

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('apnts');
  await knex.schema.dropTableIfExists('order_2_product');
  await knex.schema.dropTableIfExists('orders');
  await knex.schema.dropTableIfExists('products');
  await knex.schema.dropTableIfExists('users');
};