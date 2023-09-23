const { v4: uuid } = require('uuid');
const Model = require('./model');
const ProductModel = require('../products/model');

const { asynch } = required('util/async');
const { HttpError, DatabaseError } = required('util/error');

// ==============================================
exports.get = async (req, res) => {
    // console.log('[GET] /api/orders');
    const promise = Model.getAll();
    const [orders, error] = await asynch(promise);
    if (error)
      return next(new DatabaseError(error, '/src/api/orders/controller.js -- Model.getAll()'));
    res.status(200).json(orders);
};
// ==============================================
exports.create = async (req, res, next) => {
    // console.log('[POST] /api/orders ');
    // console.log('req.body: ', req.body);

    // Flow:
    // 1. User clicks add checkout button.
    // 2. Cart is passed to create order.
    // 3. Cart contains:
    //    - user_id
    //    - status        (DO NOT SEND FROM FRONTEND - default: 'pending')
    //    - order_total   (DO NOT SEND FROM FRONTEND - calculated on backend)
    //    - order_items   
    //      -- product_id
    //      -- quantity
    // 4. Calculate total from prices looked up from each product_id (so user cannot change price)
    // 4. Create order in orders table.  
    // 5. Place product_id's in order_2_product table.
    // 6. Generate created line_items by joining order_2_product and products.
    // 7. Send created order and line_items back to frontend.

    const { user_id, order_items } = req.body;

    if (!user_id) return next(new HttpError('user_id required', 400, '/src/api/orders/controller.js -- create()'));
    if (!order_items || order_items.length === 0) {
      // !undefined  || undefined.length === 0   =>   true  || undefined.length  =>  true   =>  order_items === undefined  throws error
      // ![]         || [].length === 0          =>   false || true              =>  true   =>  empty array                throws error
      // ![1]        || [1].length === 0         =>   false || false             =>  false  =>  non empty array            does NOT throw error
      return next(new HttpError('order_items required to be non-empty array', 400, '/src/api/orders/controller.js -- create()'));
    } // if

    // calculate total from prices looked up for each product_id
    let total = 0;
    for (let i = 0; i < order_items.length; i++) {
      const product_id = order_items[i].product_id;
      const quantity = order_items[i].quantity;
      const promise = ProductModel.getById(product_id);
      const [data, error] = await asynch(promise);
      if (error) return next(new DatabaseError(error, '/src/api/orders/controller.js -- Model.getProductPrice()'));

      const [product] = data;
      total += product.price * quantity;
    } // for i

    const promise = Model.create({
      uuid: uuid(),
      user_id,
      total,
      status: 1, // pending
    }); // promise
    const [data, error] = await asynch(promise);
    if (error)
      return next(new DatabaseError(error, '/src/api/orders/controller.js -- Model.create()'));
    const [created_order] = data;

    // place product_id's in order_2_product table
    for (let i = 0; i < order_items.length; i++) {
      const product_id = order_items[i].product_id;
      const quantity = order_items[i].quantity;
      const promise = Model.createOrder2Product({
        order_id: created_order.id,
        product_id,
        quantity,
      }); // promise
      const [data, error] = await asynch(promise);
      if (error)
        return next(new DatabaseError(error, '/src/api/orders/controller.js -- Model.createOrder2Product()'));
    } // for i

    // generate created line_items by joining order_2_product and products.
    const [line_items, error2] = await asynch(Model.getProductsInOrderById(created_order.id));
    if (error2)
      return next(new DatabaseError(error2, '/src/api/orders/controller.js -- Model.getProductsInOrderById()'));  
    // console.log('line_items: ', line_items);

    res.status(201).json({ created_order, line_items });
};

// ==============================================