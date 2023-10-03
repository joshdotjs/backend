const { order_2_product } = require('../data/data');

exports.seed = function (knex) {
  return knex('order_2_product').insert(order_2_product);
};