const db = require("../db-config")

function findBy(recipe_id){
    return db("instructions")
        .where({recipe_id})
}

function findById(instruction_id){
    return db("instructions")      //what else should this function return? 
        .where({instruction_id})
        .first()
}

async function insert(instruction, recipe_id){ // verify recipe_id gets passed in from the router
    const instructionWithRecipe = {...instruction, recipe_id: recipe_id}
    const [id] = await db("instructions").insert(instructionWithRecipe)
    return getById(id)
}

module.exports = {findBy, findById, insert}