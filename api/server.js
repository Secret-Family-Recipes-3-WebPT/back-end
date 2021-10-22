const express = require("express")

const cors = require("cors")
//Routes import
const usersRtr = require("./users/users-router")
const recipesRtr = require("./recipes/recipes-router")
// end of Routes import

const helmet = require("helmet")

const path = require("path")

const corsOptions ={
    origin: "*",
    methods:['GET', 'POST', 'PUT', 'DELETE'] ,
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
const server = express()
server.use(cors(corsOptions))
server.use(helmet())
server.use(express.json()) 


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