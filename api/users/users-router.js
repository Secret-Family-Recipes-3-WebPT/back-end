const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("./users-model");
const tokenBuilder = require("./token-builder");
const { ValidateLogin, ValidateUserNameUnique } = require("./users-middlware");

router.use(express.json());

router.get("/", (req, res, next) => {
  res.send("<h2>API RUNNING FROM THE UsersROUTER</h2>");
});

router.post("/register", ValidateUserNameUnique, async (req, res, next) => { // dont forget to add middleware!
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

router.post("/login", ValidateLogin, async (req, res, next) => { 
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

module.exports = router;
