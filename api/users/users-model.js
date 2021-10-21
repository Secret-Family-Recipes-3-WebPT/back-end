const db = require("../../data/db-config") 

function findBy(filter){ 
    return db("users").where(filter).first()
}

function findById(user_id){
    return db.select("username").from("users").where({user_id}).first()
}

async function add(user){
    const [user_id] = await db("users").insert(user,"user_id")
    return findById(user_id)
}

module.exports = {findBy,findById,add}