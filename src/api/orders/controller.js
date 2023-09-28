const { v4: uuid } = require('uuid');
const stripe = require("stripe")(env('STRIPE_PRIVATE_KEY'));

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
    console.log('[POST] /api/orders ');
    console.log('req.body: ', req.body);

    // ******** expected input ********
    // req.body: { 
    //  user_id: 1, 
    //  order_items: [
    //   { product_id: 1, quantity: 2 },
    //   { product_id: 2, quantity: 2 },
    //  ] // order_items
    // } // req.body

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
    console.log('created_order: ', created_order);

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
    // line_items: [ { 
    //   order_id: 26,
    //   product_id: 1,
    //   product_name: 'Hamburger',
    //   product_price: 100,
    //   category: 'food',
    //   quantity: 1,
    // }, ]
    const [line_items, error2] = await asynch( Model.getProductsInOrderById(created_order.id ));
    if (error2)
      return next(new DatabaseError(error2, '/src/api/orders/controller.js -- Model.getProductsInOrderById()'));  
    console.log('line_items: ', line_items);

    // send to stripe
    const url = await doStripe(line_items, created_order.uuid, next);
    console.log('url: ', url);

    // res.status(201).json({ created_order, line_items });
    res.status(201).json({ url });
};

// ==============================================

const doStripe = async (line_items, order_uuid, next) => {
  // Step 1: Normalize line_items for stripe
  const normalized_line_items = line_items.map(({product_name, product_price, quantity}) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product_name,
        },
        unit_amount: product_price,
      },
      quantity,
    }
  });

  // Step 2: Create stripe session
  const FRONTEND_URL = env('FRONTEND_URL');
  const promise = stripe.checkout.sessions.create({
    // payment_method_types: ["card", "afterpay_clearpay", "klarna"],
    payment_method_types: ["card", "klarna"],
    mode: "payment",
    line_items: normalized_line_items,
    success_url: `${FRONTEND_URL}/checkout-success?order_uuid=${order_uuid}`,
    cancel_url: `${FRONTEND_URL}/checkout-fail`,
    currency: 'USD',
  });
  console.log('nomalized_line_items: ', normalized_line_items);

  const [session, error] = await asynch( promise );
  if (error) {
    console.log('error: ', error);
    return next(new Error(error));
  }
  // console.log('session: ', session);

  // Step 3: Get stripe payment intent id
  // const payment_intent_id = session.payment_intent;
  // console.log('payment_intent_id: ', payment_intent_id);

  // Step 4: Return the stripe payment URL to frontend
  return session.url;
};

// ==============================================

exports.webhook = (request, response) => {
  const payload = request.body;
  const { type } = payload;

  
  // payload type:  payment_intent.created
  // payload type:  customer.created
  // payload type:  payment_intent.succeeded
  // payload type:  charge.succeeded
  // payload type:  checkout.session.completed

  // if (type === 'payment_intent.created') {
  //   console.yellow('Stage 1');
  // }  else if (type === 'customer.created') {
  //   console.green('Stage 2');
  // } else
   if (type === 'payment_intent.succeeded') {
    console.log("***********************************");
    console.magenta('Stage 3');
    console.log('payload: ', payload);
        
    // NOTE: This is only payment_intent ID for type === payment_intent.created & payment_intent.succeeded
    const payment_intent_id = payload.data.object.id;
    console.log('payment_intent_id: ', payment_intent_id);
   
    
    const card = payload.data.object.charges.data[0].payment_method_details.card;
    const { brand, exp_month, exp_year, last4 } = card;
    console.log('brand', brand);
    console.log('exp_month', exp_month);
    console.log('exp_year', exp_year);
    console.log('last4', last4);
    // updateOrderStatus({ 
    //   status: 3,
    //   payment_intent_id,
    //   card_brand: brand,
    //   card_exp_month: exp_month,
    //   card_exp_year: exp_year,
    //   card_last4: last4,
    // });
    console.log("***********************************");
  } 
  else if (type === 'charge.succeeded') {
    console.yellow('Stage 4');
    console.log('payload: ', payload);
  } 
  else if (type === 'checkout.session.completed') {
    console.cyan('Stage 5');
    console.log('payload: ', payload);
  }

  response.status(200).end(); // https://stackoverflow.com/a/68440790 -- "Client.Timeout exceeded while awaiting headers"
}
