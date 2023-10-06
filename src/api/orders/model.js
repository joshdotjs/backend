const db = required('db/db');
// const { dateTimeSQL } = required('util/time');

// ==============================================

exports.getAll = () => db('orders');

// ==============================================

exports.getFiltered = ({ date_time_lo, date_time_hi }) => {

  // 2023-10-04 19:39:27.707315-05
  //  -> ISO 8601 date-time format with timezone offset and fractional seconds
  //  -> https://www.postgresql.org/docs/current/datatype-datetime.html
  //  -> 2023-10-04: This is the date portion.
  //       2023: Year
  //       10: Month (October)
  //       04: Day of the month
  //  -> 19:39:27.707315: This is the time portion. 
  //       19: Hour in 24-hour format (7 PM in 12-hour format)
  //       39: Minutes
  //       27: Seconds
  //       .707315: Fractional seconds (in this case, microseconds)
  //       -05: This represents the time zone offset, indicating that the time is 5 hours behind Coordinated Universal Time (UTC). In the context of the United States, this corresponds to Central Time (CT) during Daylight Saving Time.
  // => "4th of October 2023, 7:39:27.707315 PM, Central Time (with Daylight Saving Time)"
  
  return db('orders')
    .where('created_at', '>',  date_time_lo)
    .where('created_at', '<=', date_time_hi);
}

// ==============================================

exports.create = async (order) => {
  return db('orders').insert(order, [
    'id',
    'uuid',
    'user_id',
    'total',
    'status',
  ]);
}

// ==============================================

exports.createOrder2Product = async (order) => {
  return db('order_2_product').insert(order, [
    'id',
    'order_id',
    'product_id',
    'quantity',
  ]);
}

// ==============================================

exports.getProductsInOrderById = async (order_id) => {
  // console.log('(model) getProductsInOrderById( order_id ) ');

  // const { rows } = await db.raw(`
  //   select 
  //     order_2_product.order_id,
  //     order_2_product.product_id,
  //     products.title as product_name,
  //     products.price as product_price,
  //     products.category,
  //     order_2_product.quantity
  //   from products
  //   join order_2_product on products.id = order_2_product.product_id
  //   where order_2_product.order_id = ${order_id};
  // `);
  // const rows = await db('order_2_product as o2p')
  //   .join('products as p', 'p.id', 'o2p.product_id')
  //   .select(
  //     'o2p.order_id',
  //     'o2p.product_id',
  //     'p.title as product_name',
  //     'p.price as product_price',
  //     'p.category',
  //     'o2p.quantity'
  //   )
  //   .where('o2p.order_id', order_id);
  // // console.log('(model) getProductsInOrderById( order_id ), rows:  ', rows);
  // return rows;
  return db('order_2_product as o2p')
    .join('products as p', 'p.id', 'o2p.product_id')
    .select(
      'o2p.order_id',
      'o2p.product_id',
      'p.title as product_name',
      'p.price as product_price',
      'p.category',
      'o2p.quantity'
    )
    .where('o2p.order_id', order_id);
};

// ==============================================

exports.getByUuid = async (uuid) => {
  console.log('model  --  getOrderByUuid( uuid ) ');
  return db('orders')
    .where('uuid', uuid);
};