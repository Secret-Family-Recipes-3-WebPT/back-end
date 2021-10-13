const express = require("express")
const server = express()

//Routes import
const usersRtr = require("./users/users-router")
const recipesRtr = require("./recipes/recipes-router")
// end of Routes import

const helmet = require("helmet")


server.use(helmet())

// Routes commented out Until We get them done.
   server.use("/api/users", usersRtr)
// server.use("/api/recipes", recipesRtr)


server.get("/", (req, res) => {
    res.status(200).send("API running")
})
// catch all error handling
server.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message})
})

module.exports = server