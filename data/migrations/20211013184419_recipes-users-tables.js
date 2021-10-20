
exports.up = function(knex) {
    return knex.schema
    .createTable("users", table => {
        table.increments("user_id"); // would like timestamp
        table.string("username", 128).notNullable().unique();
        table.string("password", 256).notNullable()
    })
    .createTable("categories", table => {
        table.increments("category_id");
        table.string("category", 128).notNullable()
    })

    .createTable("ingredients", table => {
        table.increments("ingredient_id")
        table.string("ingredient_name", 128).notNullable()
    })

    .createTable("recipes", table => {
        table.increments("recipe_id"); // would like timestamp
        table.string("title", 128).notNullable()
        table.string("source", 128)
        table.integer("category_id")
            .notNullable()
            .unsigned()
            .references("categories.category_id")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        table.integer("user_id")
            .notNullable()
            .unsigned()
            .references("users.user_id")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
    })

    .createTable("instructions", table => {
        table.increments("instruction_id")
        table.string("instruction_content").notNullable()
        table.integer("instruction_order").unsigned()
        table.integer("recipe_id")
            .notNullable()
            .unsigned()
            .references("recipes.recipe_id")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
    })

    .createTable("instruction_ingredient", table => {
        table.increments("ins_ing_id")
        table.integer("instruction_id")
            .notNullable()
            .unsigned()
            .references("instructions.instruction_id")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        table.integer("ingredient_id")
            .notNullable()
            .unsigned()
            .references("ingredients.ingredient_id")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("instruction_ingredient")
    .dropTableIfExists("instructions")
    .dropTableIfExists("recipes")
    .dropTableIfExists("ingredients")
    .dropTableIfExists("categories")
    .dropTableIfExists("users")
};
