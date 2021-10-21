const db = require("../../data/db-config");

async function fetchRecipeInstructions(recipe) {
  const instructionPromise = db("instructions as ins")
    .where("ins.recipe_id", recipe.recipe_id)
    .select(
      "ins.instruction_id",
      "ins.instruction_order",
      "ins.instruction_content"
    )
    .orderBy("ins.instruction_order");
  return await instructionPromise.then((instructionList) => {
    recipe.instructions = instructionList;
    return recipe;
  });
}

async function fetchRecipeIngredients(recipe) {
  return await db("ingredients as ing")
    .leftJoin(
      "instruction_ingredient as ii",
      "ing.ingredient_id",
      "ii.ingredient_id"
    )
    .leftJoin("instructions as ins", "ins.instruction_id", "ii.instruction_id")
    .where("ins.recipe_id", recipe.recipe_id)
    .select("ing.*", "ins.instruction_id");
}

function setIngredientsInRecipe(recipe, ingredients) {
  recipe.instructions.forEach((instruction) => {
    instruction.ingredients = ingredients.filter(
      (ingredient) => ingredient.instruction_id == instruction.instruction_id
    );
  });
  return recipe;
}

function findBy(user_id) {
  return db("recipes as r")
    .leftJoin("users as u", "u.user_id", "r.user_id")
    .leftJoin("categories as c", "r.category_id", "c.category_id")
    .where("r.user_id", user_id)
    .select("u.user_id", "u.username", "r.title", "r.source", "c.category");
}
function findRecipeById(id) {
  return db('recipes as r').where('r.recipe_id', id).first()
}

async function findById(recipe_id) {
  const recipePromise = db("recipes as r")
    .leftJoin("users as u", "u.user_id", "r.user_id")
    .leftJoin("categories as c","c.category_id","r.category_id")
    .where("r.recipe_id", recipe_id)
    .select(
      "u.user_id",
      "u.username",
      "r.recipe_id",
      "r.title",
      "r.source",
      "c.category"
    )
    .first();
  return await recipePromise
    .then((dbRecipe) => {
      return {
        user_id: dbRecipe.user_id,
        username: dbRecipe.username,
        recipe_id: dbRecipe.recipe_id,
        title: dbRecipe.title,
        source: dbRecipe.source,
        category: dbRecipe.category,
        instructions: [],
      };
    })
    .then((recipe) => fetchRecipeInstructions(recipe))
    .then((recipe) =>
      fetchRecipeIngredients(recipe).then((ingredients) =>
        setIngredientsInRecipe(recipe, ingredients)
      )
    );
}

async function insert(recipe, user_id) {
    const {title,source,category,instructions} = recipe
    let created_recipe_id
    await db.transaction(async trx => {
        let category_id_to_use
        const [existingCategory] = await trx("categories").where("category",category)
        if (existingCategory) {
            category_id_to_use = existingCategory.category_id
        } else {
            const [category_id] = await trx('categories').insert({ category: category },"category_id")
            category_id_to_use = category_id
        }
        const [recipe_id] = await trx("recipes").insert({
                title,
                source,
                category_id: category_id_to_use,
                user_id
            },"recipe_id")
        created_recipe_id = recipe_id
       
        for(let i=0; i<instructions.length; i++){
            const {instruction_content,instruction_order} = instructions[i]
            const [instruction_id] = await trx("instructions").insert({  
                instruction_content,
                instruction_order,
                recipe_id: created_recipe_id
            },"instruction_id")
            for(let j=0; j<instructions[i].ingredients.length ; j++){
                const ingredient = instructions[i].ingredients[j]
                const [existingIngredient] = await trx("ingredients").where("ingredient_name",ingredient)
                let ingredient_id_to_use
                if (existingIngredient) {
                    ingredient_id_to_use = existingIngredient.ingredient_id
                } else {
                    const [ingredient_id] = await trx('ingredients').insert({ ingredient_name: ingredient },"ingredient_id")
                    ingredient_id_to_use = ingredient_id
                }
                await trx("instruction_ingredient").insert({instruction_id,ingredient_id: ingredient_id_to_use})
            }    
        }    
    })
    return findById(created_recipe_id)
}

async function remove(id) {
  return await db("recipes").where("recipe_id", id).del();
}

module.exports = { findBy, findById, insert, remove, findRecipeById };
