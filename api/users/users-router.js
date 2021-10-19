const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("./users-model");
const tokenBuilder = require("./token-builder")
const {ValidateLogin} = require("./users-middlware")
const Recipe = require("../recipes/recipes-model")
const {restricted} = require("../users/users-middlware")

router.use(express.json());

router.get("/", (req, res, next) => {
  res.send("<h2>API RUNNING FROM THE UsersROUTER</h2>");
});

router.post("/register", async (req, res, next) => { // dont forget to add middleware!
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;
  try {
     const newUser = await User.add(user)
     res.status(201).json(newUser)
  } catch (error) {
    next(error);
  }
});

router.post("/login", ValidateLogin ,async (req, res, next) => { // dont forget to add middleware!
  const { password } = req.body;
  const { user } = req; 
  const validUser = bcrypt.compareSync(password, user.password);
  if (validUser) {
    const token = tokenBuilder(user)
    res.status(200).json({ message: `Welcome Back, ${user.username}`, token});
  } else {
      next({ status: 401, message: 'Invalid Credentials. Please try again or register!'})
  }
});

router.get("/:user_id/recipes", restricted, async (req, res, next) => { 
    const recipes = await Recipe.findBy(req.params.user_id)
    res.status(200).json(recipes)
})

router.post("/:user_id/recipes", /*restricted,*/async (req, res, next) => { // add middleware
    const [id] = await Recipe.insert(req.body, req.params.user_id )
    const newRecipe = await Recipe.findById(id)
    res.status(201).json(newRecipe)
})

module.exports = router;
