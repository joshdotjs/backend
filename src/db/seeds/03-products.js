const { products } = require('../data/data');

exports.seed = function (knex) {
 return knex('products').insert(products);
};