const { hash }    = require('../../util/hash');
const { uuid }    = require('../../util/uuid');
const { readCSV } = require('../csv/read-csv');

// ==============================================

const users = [
  {
    email: 'josh@josh.com',
    password: hash('josh'),
    is_admin: true,
    first_name: 'josh',
    last_name: 'holloway',
  },
  {
    email: 'mark@facebook.com',
    password: hash('mark'),
    is_admin: false,
    first_name: 'mark',
    last_name: 'zuckerberg',
  },
  {
    email: 'steve@apple.com',
    password: hash('steve'),
    is_admin: false,
    first_name: 'steve',
    last_name: 'jobs',
  },
  {
    email: 'sergey@google.com',
    password: hash('sergey'),
    is_admin: false,
    first_name: 'sergey',
    last_name: 'brin',
  }
];

// ==============================================
// ==============================================
// ==============================================
// ==============================================

// let products;
// (async () => {
//   const products = await readCSV();
//   products.forEach((product) => {
//     return {
//       ...product,
//       uuid: uuid(),
//     };
//   });
//   console.log('products: ', products);
// })();

const products = [
  {
    uuid: uuid(),
    title: 'Hamburger',
    description: 'A hamburger is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun.',
    category: 'food',
    status: 'available',
    published: true,
    price: 100,
    units_in_stock: 100,
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/800px-RedDot_Burger.jpg', 
    image_alt: 'A hamburger',
    details_route: '/products/hamburger',
  },
  {
    uuid: uuid(),
    title: 'Pizza',
    description: 'Pizza is a savory dish of Italian origin consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients (such as anchovies, mushrooms, onions, olives, pineapple, meat, etc.) which is then baked at a high temperature, traditionally in a wood-fired oven.',
    category: 'food',
    status: 'available',
    published: true,
    price: 200,
    units_in_stock: 100,
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/800px-Eq_it-na_pizza-margherita_sep2005_sml.jpg',
    image_alt: 'A pizza',
    details_route: '/products/pizza',  
  },
  {
    uuid: uuid(),
    title: 'Hot Dog',
    description: 'A hot dog (also spelled hotdog) is a food consisting of a grilled or steamed sausage served in the slit of a partially sliced bun. It can also refer to the sausage itself. The sausage used is the wiener (Vienna sausage) or frankfurter (Frankfurter Würstchen, also just called frank).',
    category: 'food',
    status: 'available',
    published: true,
    price: 300,
    units_in_stock: 100,
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Hotdog_-_Evan_Swigart.jpg/800px-Hotdog_-_Evan_Swigart.jpg',
    image_alt: 'A hot dog',
    details_route: '/products/hot-dog',
  },
  {
    uuid: uuid(),
    title: 'Taco',
    description: 'A taco is a traditional Mexican dish consisting of a small hand-sized corn or wheat tortilla topped with a filling. The tortilla is then folded around the filling and eaten by hand.',
    category: 'food',
    status: 'available',
    published: true,
    price: 400,
    units_in_stock: 100,
    image_url: null,
    image_alt: 'A taco',
    details_route: '/products/taco',
  },
];

// ==============================================
// ==============================================
// ==============================================
// ==============================================

const orders = [
  {
    uuid: uuid(),
    status: 1,
    user_id: 1,
    total: null,
  },
  {
    uuid: uuid(),
    status: 1,
    user_id: 1,
    total: null,
  },
  {
    uuid: uuid(),
    status: 1,
    user_id: 2,
    total: null,
  },
];

// ==============================================
// ==============================================
// ==============================================
// ==============================================

const order_2_product = [
  {
    order_id: 1,
    product_id: 1,
    quantity: 1,
  },
  {
    order_id: 1,
    product_id: 2,
    quantity: 1,
  },
  {
    order_id: 2,
    product_id: 1,
    quantity: 2,
  },
  {
    order_id: 2,
    product_id: 2,
    quantity: 2,
  },
  {
    order_id: 3,
    product_id: 1,
    quantity: 3,
  },
  {
    order_id: 3,
    product_id: 2,
    quantity: 3,
  },
];

// ==============================================
// ==============================================
// ==============================================
// ==============================================

const id2idx = id  => id  - 1;
const idx2id = idx => idx + 1;

// update total for orders
// orders[0].total = 
//   products[id2idx(order_2_product[0].product_id)].price * order_2_product[0].quantity +
//   products[id2idx(order_2_product[1].product_id)].price * order_2_product[1].quantity;

calculateTotal = ({ order, products, order_2_product, order_id }) => {
  const filtered = order_2_product.filter((o2p) => o2p.order_id === order_id);

  let total = 0;
  filtered.forEach((o2p) => {
    const product = products[id2idx(o2p.product_id)];
    total += product.price * o2p.quantity;
  });
  order.total = total;
};

orders.forEach((order) => calculateTotal({ order, products, order_2_product, order_id: order.id }));

// ==============================================
// ==============================================
// ==============================================
// ==============================================

module.exports = {
  users,
  products,
  orders,
  order_2_product,
  calculateTotal, // for testing
};