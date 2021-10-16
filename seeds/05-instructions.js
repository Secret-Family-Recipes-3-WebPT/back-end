
exports.seed = function(knex) {
      return knex('instructions').insert([
        //grilled cheese
        {instruction_content: 'butter up two slices of bread and put them on a hot skillet', instruction_order: 1, recipe_id: 1},
        {instruction_content: 'put gouda and sharp cheddar on one slice of bread to melt', instruction_order: 2, recipe_id: 1},
        {instruction_content: 'place other slice on melted cheese and flip until golden on both sides', instruction_order: 3, recipe_id: 1},
        //french onion soup
        {instruction_content: 'melt butter in large soup pot', instruction_order: 1, recipe_id: 2},
        {instruction_content: 'stir in onions until carmelized', instruction_order: 2, recipe_id: 2},
        {instruction_content: 'add red wine to the onions, let it reduce', instruction_order: 3, recipe_id: 2},
        {instruction_content: 'pour beef broth into pot and let it simmer for 20 minutes', instruction_order: 4, recipe_id: 2},
        {instruction_content: 'grab portion of soup and add a slice of bread on top', instruction_order: 5, recipe_id: 2},
        {instruction_content: 'add mozzerella cheese on top and put in the oven to melt', instruction_order: 6, recipe_id: 2},
      ]);
};
