
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
        {instruction_id: 9, ingredient_id: 8},
        //lemon cake
        {instruction_id: 10, ingredient_id: 9},
        {instruction_id: 10, ingredient_id: 10},
        {instruction_id: 10, ingredient_id: 11},
        {instruction_id: 11, ingredient_id: 2},
        {instruction_id: 11, ingredient_id: 12},
        {instruction_id: 12, ingredient_id: 13},
        {instruction_id: 12, ingredient_id: 14},
        {instruction_id: 12, ingredient_id: 15},
        {instruction_id: 13, ingredient_id: 16},
        //philadelphia roll
        {instruction_id: 15, ingredient_id: 17},
        {instruction_id: 16, ingredient_id: 18},
        {instruction_id: 17, ingredient_id: 22},
        {instruction_id: 18, ingredient_id: 23},
        {instruction_id: 20, ingredient_id: 19},
        {instruction_id: 20, ingredient_id: 20},
        {instruction_id: 20, ingredient_id: 21},
      ]);
};
