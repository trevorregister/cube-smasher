const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const userValidator = require('../middleware/validators/user.validator')

router.post('/register', userValidator.newUser, usersController.newUser)
router.post('/login', usersController.login)
router.post('/rental', usersController.checkOut)
router.patch('/rental/check-in', usersController.checkIn)

module.exports = router