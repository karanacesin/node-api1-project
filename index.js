const express = require('express')
const shortid = require('shortid')

const server = express()

server.use(express.json())

let users =[

    {
        id: shortid.generate(),
        name: 'Dawna',
        bio: 'Spirit filled Christian',
    },

    {
        id: shortid.generate(),
        name: 'Jim',
        bio: 'Amazing father',
    },

    {
        id: shortid.generate(),
        name: 'Dawna',
        bio: 'Mother bear',
    },

    {
        id: shortid.generate(),
        name: 'Jimmy',
        bio: 'Mechanic',
    },

    {
        id: shortid.generate(),
        name: 'Stephen',
        bio: 'Techie',
    },
]

server.get('/api/users', (req, res) => {
    users.find()

    .then(users => {
        res.status(200).json(users)
    })

    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: 'The user information could not be retrieved.'}) 
    })

})

server.get('/api/users/:id', (req, res) => {

    const id = req.params.id
    users.find(user => user.id === id)

    .then(found => {
        if (found){
            res.status(200).json(found)
        } else {
            res.status(404).json({message: 'The user with the specified Id does not exist.'})
        }
    })

    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: 'The user information could not be retrieved.'})
    })
})

server.post('/api/users', (req, res) => {

    const newUser = req.body
    newUser.id = shortid.generate()
    

    if(!name || !bio){
        res.status(400).json({message:'Please provide name and bio for the user'})
    } else {
        users.push(newUser)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: 'There was an error while saving the user to the database.'})
        })
    }

})

server.put('/api/users/:id', (req, res) => {

    const id = req.params.id
    const update = req.body

    let found = users.find(user => user.id === id)

    if(found) {
        Object.assign(found, update)
        .then(found =>{
            res.status(200).json(found)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: 'The user information could not be modified.'})
        })
    } else if (!update.name || !update.bio){
        res.status(400).json({message:'Please provide name and bio for the user'})
    } else {
        res.status(404).json({message: 'The user with the specified Id does not exist.'})
    }

})

server.delete('/api/users/:id', (req, res) => {

    const id = req.params.id
    const deleted = users.find(user => user.id === id)
    
    if(deleted){
        users = users.filter(user => user.id !== id)
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: 'The user information could not be removed.'})
        })
    } else {
        res.status(404).json({message: 'The user with the specified Id does not exist.'})
    }
})

const PORT = 5000
server.listen(PORT, () => console.log(`server running on port ${PORT}`))