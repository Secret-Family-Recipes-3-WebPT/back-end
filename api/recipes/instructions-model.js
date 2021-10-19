const db = require("../../data/db-config")

function findBy(recipe_id){
    return db("instructions")
        .where({recipe_id})
}

function findById(instruction_id){
    return db("instructions") 
        .where({instruction_id})
        .first()
}

async function insert(instruction, recipe_id){
    const instructionWithRecipe = {...instruction, recipe_id: recipe_id}
    const [id] = await db("instructions").insert(instructionWithRecipe)
    return findById(id)
}

module.exports = {findBy, findById, insert}