const express = require("express")
const server = express()
const cors = require("cors")
//Routes import
const usersRtr = require("./users/users-router")
const recipesRtr = require("./recipes/recipes-router")
// end of Routes import

const helmet = require("helmet")

const path = require("path")


server.use(cors())
server.use(helmet())
server.use(express.json()) // according to Dave Kidd, this is needed if we are going to be making body requests. I may have misunderstood its true use. 53:50
server.use(express.static(path.join(__dirname,"front-end/front-end-work"))) // not sure if this one is will work 1:34:00 DaveKidd


// Routes 
   server.use("/api/users", usersRtr)
   server.use("/api/recipes", recipesRtr)


server.get("/", (req, res) => {
    res.status(200).send("API running")
})
// catch all error handling
server.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message})
})

module.exports = server