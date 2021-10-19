const e = require("express")
const User = require("./users-model")
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../secrets")

const restricted = (req, res, next) => {
    const token = req.headers.authorization

    if(!token){
        res.status(401).json({message:"Token required"})
    }
        jwt.verify(token,JWT_SECRET,(err,decoded) => {
            if(err){
                res.status(401).json({message:"Token invalid" + err.message})
            }else {
                req.decodedToken = decoded    
            }
            next()
        })
  
}

const ValidateUserNameUnique = async (req, res, next) => {
    const { username } = req.body
    try {
        const existing = await User.findBy({ username })
        if(existing) {
            next({ status: 400, message: "Username already exists!"})
        } else {
            next()
        }
    } catch(error) {
        next(error)
    }
}


const ValidateLogin = async (req, res, next) => {
  const { username } = req.body
  const existingUser = await User.findBy({ username })
  if(username === undefined || username.length < 3) {
      next({ status: 400, message: 'Username must exist and be more than 3 characters!'})
  } else if(typeof username !== 'string'){
          res.status(400).json({message: 'username must not be a number!'})
  } else if(!existingUser){
          res.status(404).json({message:err})
  } else {
    req.user = existingUser
    next()
  }
}

module.exports = { restricted, ValidateLogin, ValidateUserNameUnique}