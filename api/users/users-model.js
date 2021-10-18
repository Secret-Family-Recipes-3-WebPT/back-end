const db = require("../../data/db-config.js") //waiting for actual db-config file's name and location

function findBy(filter){ 
    return db("users").where(filter).first()
}

function findById(user_id){
    return db("users").where({user_id}).first()
}

async function add(user){
    const [user_id] = await db("users").insert(user)
    return findById(user_id)
}


module.exports = {findBy,findById,add}