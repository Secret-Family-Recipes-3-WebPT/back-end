//.env variables
const dotenv = require("dotenv")
dotenv.config()
//
const server = require("./api/server")

const port = process.env.PORT || 8080

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
