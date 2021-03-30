const express = require('express')
const router = express.Router()
const Users = require('../models/users')

// Getting all
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(Users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
    // Create a new user
    app.post('/users', users.create);

    // Retrieve all users
    app.get('/users', users.findAll);

    // Retrieve a single user 
    app.get('/user/:userId', users.findOne);

    // Update a users w
    app.patch('/users/:userId', users.update);

    // Delete a user 
    app.delete('/users/:userId', users.delete);

module.exports = router