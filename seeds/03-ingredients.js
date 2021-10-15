exports.seed = function(knex) {
      return knex('ingredients').insert([
        {ingredient_name: 'bread'},
        {ingredient_name: 'butter'},
        {ingredient_name: 'gouda'},
        {ingredient_name: 'sharp cheddar'},
        {ingredient_name: 'onion'},
        {ingredient_name: 'beef broth'},
        {ingredient_name: 'red wine'},
        {ingredient_name: 'mozzarella'}
      ]);
};
