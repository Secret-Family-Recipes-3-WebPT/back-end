const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("./users-model");

router.use(express.json());

router.get("/", (req, res, next) => {
  res.send("<h2>API RUNNING FROM THE UsersROUTER</h2>");
});

router.post("/register", async (req, res, next) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;
  try {
    // const newUser = await User.add(user)
    // res.status(201).json(newUser)
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { password } = req.body;
  const { user } = req; // will be implemented in middleware
  const validUser = bcrypt.compareSync(password, user.password);
  if (validUser) {
    // const token = tokenBuilder(user)
    res.send(200).json({ message: `Welcome Back, ${user.username}`}); // add token to json obj once tokenbuilder is made.
  } else {
      next({ status: 401, message: 'Invalid Credentials'})
  }
});

module.exports = router;
