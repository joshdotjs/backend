const { users } = require('../data/data');

exports.seed = function (knex) {
  return knex('users').insert(users);
};