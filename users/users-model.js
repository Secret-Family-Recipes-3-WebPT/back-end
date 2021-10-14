const db = require("../data/db-config.js") //waiting for actual db-config file's name and location

function findUserById(user_id){
    return db("users").where({user_id}).first()
}

async function add(user){
    const [user_id] = await db("users").insert(user)
    return findUserById(user_id)
}

module.exports = {findUserById,add}