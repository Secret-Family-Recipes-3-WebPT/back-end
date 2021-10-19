const db = require("../../data/db-config");

function findBy(user_id) {
  return db("recipes as r")
    .leftJoin("users as u", "u.user_id", "r.user_id")
    .leftJoin("categories as c", "r.category_id", "c.category_id")
    .where("r.user_id", user_id)
    .select("u.user_id", "u.username", "r.title", "r.source", "c.category");
}

async function findById(recipe_id) {
  const data = await db("recipes as r")
    .leftJoin("users as u", "u.user_id", "r.user_id")
    .leftJoin("instructions as inst", "r.recipe_id", "inst.recipe_id")
    .leftJoin(
      "instruction_ingredient as ii",
      "inst.instruction_id",
      "ii.instruction_id"
    )
    .leftJoin("ingredients as ingr", "ii.ingredient_id", "ingr.ingredient_id")
    .leftJoin("categories as c", "c.category_id", "r.category_id")
    .where("r.recipe_id", recipe_id)
    .select(
      "u.user_id",
      "u.username",
      "r.title",
      "r.source",
      "ingr.ingredient_name",
      "inst.instruction_content",
      "inst.instruction_order",
      "c.category"
    )
    .orderBy("inst.instruction_order");

    const result = {
        user_id: data[0].user_id,
        username: data[0].username,
        title: data[0].title,
        source: data[0].source,
        category: data[0].category,
        //instructions: data.map(row => ({ instruction_order: row.instruction_order, directions: row.instruction_content, ingredients: row.ingredient_name}))
    }
     //return data
    return result
}

async function insert(recipe, user_id) {
  const recipeWithUser = { ...recipe, user_id: user_id };
  const [id] = await db("recipes").insert(recipeWithUser);
  return findById(id);
}

module.exports = { findBy, findById, insert };
