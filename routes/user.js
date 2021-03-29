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

// Getting One
router.get('/:id', getUser, (req, res) => {
  res.json(res.Users)
})

// Creating one
router.post('/', async (req, res) => {
  const Users = new Users({
    name: req.body.name,
    signedup: req.body.signedup
  })
  try {
    const newSubscriber = await Users.save()
    res.status(201).json(newSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getUsers, async (req, res) => {
  if (req.body.name != null) {
    res.Users.name = req.body.name
  }
  if (req.body.signedup != null) {
    res.Users.signedup = req.body.signedup
  }
  try {
    const updateUsers = await res.Users.save()
    res.json(updateUsers)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.Users.remove()
    res.json({ message: 'Deleted Users' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getUser(req, res, next) {
  let Users
  try {
    Users = await Users.findById(req.params.id)
    if (Users == null) {
      return res.status(404).json({ message: 'Cannot find Users' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.Users = Users
  next()
}

module.exports = router