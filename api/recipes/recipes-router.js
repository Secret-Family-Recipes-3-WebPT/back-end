const express = require("express");
const router = express.Router();
const Recipe = require("./recipes-model")
router.use(express.json())


router.get("/", (req, res, next) => {
    res.send("<h2>API RUNNING FROM RECIPE-ROUTER</h2>")
})

router.get("/users/:user_id/recipes", async (req, res, next) => { 
    const recipes = await Recipe.findBy(req.params.user_id)
    res.status(200).json(recipes)
})
router.post("/users/:user_id/recipes", async (req, res, next) => { // add middleware
    const [id] = await Recipe.insert(req.body)
    const newRecipe = await Recipe.findById(id)
    res.status(201).json(newRecipe)
})



module.exports = router