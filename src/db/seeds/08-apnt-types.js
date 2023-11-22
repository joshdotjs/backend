const apnt_types = [
  {
    name: "Men's Haircut",
    price: 9000,
  },
  {
    name: "Women's Haircut",
    price: 10000,
  },
  {
    name: "Hair Coloring",
    price: 15000,
  },
  {
    name: "Extensions",
    price: 20000,
  }
];

exports.seed = function (knex) {
  return knex('apnt_types').insert(apnt_types);
};