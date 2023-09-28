const db = required('db/db');

// ==============================================

exports.getAll = async () => {
  return db('orders');
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