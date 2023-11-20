const apnt_types = [
  {
    name: "Men's Haircut",
    price: 9000,
  },
  {
    name: "Women's Haircut",
    price: 10000,
  }
];

exports.seed = function (knex) {
  return knex('apnt_types').insert(apnt_types);
};