const express = require("express");
const router = express.Router();
const Recipe = require("./recipes-model")
const {checkRecipeId} = require("./recipes-middleware")
const {restricted} = require("../users/users-middlware")

router.get("/:recipe_id", checkRecipeId, async (req, res, next) => {
    const recipe = await Recipe.findById(req.params.recipe_id)
    res.status(200).json(recipe)
})

router.delete("/:recipe_id", checkRecipeId, restricted, async (req, res, next) => {
    try {
          await Recipe.remove(req.params.recipe_id)
    res.send({ message: `Deleted Successfully!`})
    } catch (error) {
        next(error)
    }
  
})

module.exports = router