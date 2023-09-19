const { products } = require('../fake-data/data');

exports.seed = function (knex) {
 return knex('products').insert(products);
};