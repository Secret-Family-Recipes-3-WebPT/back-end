const Recipe = require("./recipes-model")
const JwtSecret = process.env.JWT_SECRET || 'fallback'
const jwt = require('jsonwebtoken')

const restricted = (req,res,next) => {
    const token = req.headers.authorization
    if(!token) {
        next({ status: 401, message: "token required!"})
    } 
    jwt.verify(token, JwtSecret, (error, decoded) => {
        if(error) {
            next({ status: 401, message: 'Token invalid, either it has timed out or has been tampered with!'})
        } 
        req.decoded = decoded
    })
    next()
}

const validateRecipe = async (req, res,next) => {
    const { title, source, category, ingredients, instructions } = req.body

    if(title === undefined || title.trim() === '') {
        next({ status: 400, message: 'Please provide a title!'})
    } else if(source === undefined || source.trim() === '') {
        next({ status: 400, message: 'Please tell us where you got this Recipe from!'})
    } else if(category === undefined || category.trim() === '') {
        next({ status: 400, message: 'Please provide a category.'})
    } else if(ingredients === [] || ingredients === undefined) {
        next({ status: 400, message: 'ingredients must be an array and must not be undefined!'})
    } else if(instructions === [] || instructions === undefined) {
        next({status: 400, message: 'instructions must be an array and must not be undefined!'})
    } else {
        next()
    }
}

module.exports = { validateRecipe, restricted }