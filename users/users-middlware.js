const e = require("express")
const User = require("./users-model")


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
  if(username === undefined || username.length < 3) {
      next({ status: 400, message: 'Username must exist and be more than 3 characters!'})
  } else {
      if(typeof username !== 'string') {
          next({ status: 400, message: 'username must not be a number!'})
      } else {
          const existingUser = await User.findBy({ username })
          req.user = existingUser
          next()
      }
  }
} 

module.exports = { ValidateLogin, ValidateUserNameUnique}