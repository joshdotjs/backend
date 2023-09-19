const { users } = require('../fake-data/data');

exports.seed = function (knex) {
  return knex('users').insert(users);
};