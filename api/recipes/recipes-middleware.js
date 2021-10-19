const Recipe = require("./recipes-model")
const JwtSecret = process.env.JWT_SECRET || 'fallback'
const jwt = require('jsonwebtoken')

const checkRecipeId = async (req, res, next) => {
    const { recipe_id } = req.params
    const existing = await Recipe.findById(recipe_id)
    if(!existing) {
        next({ status: 404, message: `no recipe with id ${recipe_id}!`})
    } else {
        next()
    }
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

module.exports = { validateRecipe, checkRecipeId }