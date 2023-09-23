const { orders } = require('../fake-data/data');

exports.seed = function (knex) {
  return knex('orders').insert(orders);
};