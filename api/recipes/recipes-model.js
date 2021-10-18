
const db = require("../../data/db-config") 

function findBy(user_id){
    return db("recipes as r")
        .leftJoin("users as u","u.user_id","r.user_id")
        .leftJoin("categories as c","r.category_id","c.category_id")
        .where("r.user_id",user_id)
        .select("u.user_id","u.username","r.title","r.source","c.category")
}

function findById(recipe_id){
    return db("recipes as r")
        .leftJoin("users as u","u.user_id","r.user_id")
        .leftJoin("instructions as inst","r.recipe_id","inst.recipe_id")
        .leftJoin("instruction-ingredients_table as ii","inst.instruction_id","ii.instruction_id")
        .leftJoin("ingredients as ingr","ii.ingredient_id","ingr.ingredient_id")
        .leftJoin("categories as c","c.category_id","r.category_id")
        .where("r.recipe_id",recipe_id)
        .select("u.user_id","u.username","r.title*","r.source","ingr.ingredient_name","inst.instruction_content","inst.instruction_order","c.category")
        .orderBy("inst.instruction_order")
}

async function insert(recipe, user_id) {
    const recipeWithUser = {...recipe,user_id:user_id}
    const [id] = await db("recipes").insert(recipeWithUser)
    return findById(id)
}

module.exports = {findBy, findById, insert}