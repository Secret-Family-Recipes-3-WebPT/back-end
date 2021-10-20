const db = require("../../data/db-config");

async function fetchRecipeInstructions (recipe){
    const instructionPromise = db("instructions as ins")
        .where("ins.recipe_id",recipe.recipe_id)
        .select("ins.instruction_id","ins.instruction_order","ins.instruction_content")
        .orderBy("ins.instruction_order")      
        return await instructionPromise.then(instructionList => {
            recipe.instructions = instructionList
            return recipe
        })
}

async function fetchRecipeIngredients (recipe) {
    return await db("ingredients as ing")
        .leftJoin("instruction_ingredient as ii","ing.ingredient_id","ii.ingredient_id")
        .leftJoin("instructions as ins","ins.instruction_id","ii.instruction_id")
        .where("ins.recipe_id",recipe.recipe_id)
        .select("ing.*","ins.instruction_id") 
}

function setIngredientsInRecipe(recipe,ingredients){
    recipe.instructions.forEach(instruction => {
        instruction.ingredients = ingredients.filter(ingredient => ingredient.instruction_id ==instruction.instruction_id)
    })
    return recipe
}

function findBy(user_id) {
  return db("recipes as r")
    .leftJoin("users as u", "u.user_id", "r.user_id")
    .leftJoin("categories as c", "r.category_id", "c.category_id")
    .where("r.user_id", user_id)
    .select("u.user_id", "u.username", "r.title", "r.source", "c.category");
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
    
    return await recipePromise.then(dbRecipe => {
        return {
            "user_id": dbRecipe.user_id,
            "username": dbRecipe.username,
            "recipe_id": dbRecipe.recipe_id,
            "title": dbRecipe.title,
            "source": dbRecipe.source,
            "category": dbRecipe.category,
            "instructions":[]
        }               
    })
    .then(recipe => fetchRecipeInstructions(recipe))
    .then(recipe => fetchRecipeIngredients(recipe)
    .then(ingredients => setIngredientsInRecipe(recipe,ingredients)))
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
            const [category_id] = await trx('categories').insert({ category: category })
            category_id_to_use = category_id
        }
        instructions.map(async (instruction) => {
            const {
                instruction_content, 
                instruction_order,
                ingredients
            } = instruction
            await trx("instructions").insert({  
                instruction_content,
                instruction_order,
                recipe_id: created_recipe_id
            }) 
            if(ingredients){
                ingredients.map(async (ingredient) => {
                    await trx("ingredients").insert({ingredient_name: ingredient})
                })
            }
        })
        const [recipe_id] = await trx("recipes")
            .insert({
                title,
                source,
                category_id: category_id_to_use,
                user_id
            })
        created_recipe_id = recipe_id
    })
    return findById(created_recipe_id)
//   const recipeWithUser = { ...recipe, user_id: user_id };
//   const [id] = await db("recipes").insert(recipeWithUser);
//   return findById(id);
}

module.exports = { findBy, findById, insert };
