exports.seed = function(knex, Promise) {
  return knex('categories').insert([
    {category: 'sandwich'},
    {category: 'soup'},
  ]);
};
