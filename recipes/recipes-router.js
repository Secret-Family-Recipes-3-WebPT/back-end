const express = require("express");
const router = express.Router();


router.use(express.json())


router.get("/", (req, res, next) => {
    res.send("<h2>API RUNNING FROM RECIPE-ROUTER</h2>")
})

module.exports = router