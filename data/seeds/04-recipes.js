exports.seed = function(knex) {
      return knex('recipes').insert([
        {title: 'Grilled Cheese Sandwich', source: 'Momma June', category_id: 1, user_id: 1},
        {title: 'French Onion Soup', source: 'Uncle Robbie', category_id: 2, user_id: 2},
        {title: 'Lemon Cake', source: 'Granny Smith', category_id: 9, user_id: 2},
        {title: 'Philadelphia Roll', source: 'Cousin Mike', category_id: 17, user_id: 1}
      ]);
};
