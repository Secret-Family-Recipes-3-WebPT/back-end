const express = require("express");
const router = express.Router();
const Recipe = require("./recipes-model")
router.use(express.json())


router.get("/:recipe_id", async (req, res, next) => {
    const recipe = await Recipe.findById(req.params.recipe_id)
    res.status(200).json(recipe)
})



module.exports = router