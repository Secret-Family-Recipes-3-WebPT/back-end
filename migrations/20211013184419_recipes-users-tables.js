
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

    .createTable("recipes", table => {
        table.increments("recipe_id"); // would like timestamp
        table.string("title", 128).notNullable()
        table.string("source", 128)
        table.string("ingredients", 256).notNullable()
        table.text("instructions").notNullable()
        table.integer("category")
            .unsigned()
            .references("categories.category_id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE")
        table.integer("user").notNullable()
            .unsigned()
            .references("users.user_id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE")
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("recipes")
    .dropTableIfExists("categories")
    .dropTableIfExists("users")
};
