// BUILD YOUR SERVER HERE

const express = require("express")
const User = require("./users/model")

const server = express()

server.use(express.json())

server.use("*", (req, res) => {
    res.status(200).json({message: "Why ello there!"}) 
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
