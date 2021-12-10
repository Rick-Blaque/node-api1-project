// BUILD YOUR SERVER HERE

const express = require("express")
const User = require("./users/model")

const server = express()

server.use(express.json())

server.get('/api/users', (req, res) => { User.find().then(user => {
    res.json(user).catch(err => {
        res.status(500).json({message:'The users information could not be retrieved', error: err.message})
    })
})
})
server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        if(!user) {
            res.status(404).json({message:'The user with the specified ID does not exist'})
        }else{

        
        res.json(user)
    }
    })
    .catch(err => {
        res.status(500).json({message:'The user information could not be retrieved', error: err.message})
    })
})
server.post('/api/users', (req, res) => {
    try {
        if(!req.body.name || !req.body.bio){
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        } else {
            User.insert(req.body)
    .then(newDog => {
        res.status(201).json(newDog)
    })
    .catch(err => {
        res.status(500).json({message:'There was an error while saving the user to the database', error: err.message})
        })
    }
} catch (error) {
        console.log(error)
    }
    // User.insert(req.body)
    // .then(newDog => {
    //     res.status(201).json(newDog)
    // })
    // .catch(err => {
    //     res.status(500).json({message:'bad happened', error: err.message})
    // })
})

server.patch('/api/users/:id', (req, res) => {
    User.update(req.params.id, req.body)
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        res.status(404).json({
            message: "Dog by id not found",
            error: err

        })
    })

})
server.delete('/api/users/:id', (req, res) => {
    User.remove(req.params.id)
    .then(user => {
        if(!user) {
            res.status(404).json({message:'The user with the specified ID does not exist'})
        }else{

        
        res.json(user)
    }
    })
    .catch(err => {
        res.status(500).json({message:'The user could not be removed', error: err.message})
    })
})

server.get("*", (req, res) => {
    res.status(201).json({message: "Why ello there!"}) 
})

module.exports = server; // EXPORT YOUR SERVER instead of {}