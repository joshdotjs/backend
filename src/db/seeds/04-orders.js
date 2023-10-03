const { orders } = require('../data/data');

exports.seed = function (knex) {
  return knex('orders').insert(orders);
};