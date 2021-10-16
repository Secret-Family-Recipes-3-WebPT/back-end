exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {username: 'testUser', password: 'pw1234'},
    {username: 'PaulaDean', password: 'butter123'},
  ]);
};
