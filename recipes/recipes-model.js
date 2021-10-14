const db = require("../data/db-config") //waiting for actual db-config file's name and location

function findAllRecipes(){
    return db("recipes")
}

function findRecipeById(recipe_id){
    return db("recipes as r")
        .leftJoin("steps as s","r.recipe_id","s.recipe_id")
        .leftJoin("step-ingredients as si","s.step_id","si.step_id")
        .leftJoin("ingredients as i","si.ingredient_id","i.ingredient_id")
        .leftJoin("categories as c","c.category_id","r.category_id")
        .where("r.recipe_id",recipe_id)
        .select("s.*","i.ingredient_name","s.instructions","c.category_name")

}

module.exports = {findAllRecipes,findRecipeById}