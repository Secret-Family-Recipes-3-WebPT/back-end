
exports.seed = function(knex) {
      return knex('instruction_ingredient').insert([
        //grilled cheese sandwich
        {instruction_id: 1, ingredient_id: 2},
        {instruction_id: 1, ingredient_id: 1},
        {instruction_id: 2, ingredient_id: 3},
        {instruction_id: 2, ingredient_id: 4},
        //french onion soup
        {instruction_id: 4, ingredient_id: 2},
        {instruction_id: 5, ingredient_id: 5},
        {instruction_id: 6, ingredient_id: 7},
        {instruction_id: 7, ingredient_id: 6},
        {instruction_id: 8, ingredient_id: 1},
        {instruction_id: 9, ingredient_id: 8}
      ]);
};
