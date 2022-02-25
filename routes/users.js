const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.post('/register', usersController.registerUser)
router.post('/login', usersController.login)
router.post('/rental', usersController.createRental)

module.exports = router