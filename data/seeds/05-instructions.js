
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
        //lemon cake
        {instruction_content: 'mix flour, baking powder, and lemon zest in a bowl', instruction_order: 1, recipe_id: 3},
        {instruction_content: 'in a mixer, mix butter and sugar until fluffy', instruction_order: 2, recipe_id: 3},
        {instruction_content: 'in the same mixer, add eggs, vanilla extract, and lemon juice until well mixed', instruction_order: 3, recipe_id: 3},
        {instruction_content: 'add the flour mixture and butter milk from the first step to the mixer, mix until there are no clumps', instruction_order: 4, recipe_id: 3},
        {instruction_content: 'pour batter into baking pan and bake at 350 degrees for 45 minutes', instruction_order: 5, recipe_id: 3},
        //philadephia roll
        {instruction_content: 'steam sushi rice and let cool', instruction_order: 1, recipe_id: 4},
        {instruction_content: 'sprinkle sushi vinegar on cooled sushi rice', instruction_order: 2, recipe_id: 4},
        {instruction_content: 'place nori(seaweed) sheet on rolling mat', instruction_order: 3, recipe_id: 4},
        {instruction_content: 'spead sushi rice on one side of the nori sheet and sprinkle sesame seeds on rice', instruction_order: 4, recipe_id: 4},
        {instruction_content: 'flip the nori sheet with rice side facing down', instruction_order: 5, recipe_id: 4},
        {instruction_content: 'place smoked salmon, thinnly sliced cucumber, and cream cheese on bottom end of nori sheet', instruction_order: 6, recipe_id: 4},
        {instruction_content: 'starting from the bottom, roll the nori sheet into a cylinder shape, and cut into 8 even pieces', instruction_order: 7, recipe_id: 4},
      ]);
};
