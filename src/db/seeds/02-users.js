const { hash } = require('../../util/hash');

// ==============================================

exports.seed = function (knex) {
  
  // --------------------------------------------
  
  const users = [
    {
      email: 'josh@josh.com',
      password: hash('josh'),
      is_admin: false,
    },
    {
      email: 'mark@facebook.com',
      password: hash('mark'),
      is_admin: false,
    },
    {
      email: 'steve@apple.com',
      password: hash('steve'),
      is_admin: false,
    },
    {
      email: 'sergey@google.com',
      password: hash('sergey'),
      is_admin: false,
    }
  ];

  // --------------------------------------------

  return knex('users').insert(users);

  // --------------------------------------------
};

// ==============================================