const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const userValidator = require('../middleware/validators/user.validator')
const auth = require('../middleware/auth')

router.get('/me', auth.auth, usersController.currentUser)
router.get('/', auth.auth, usersController.users)
router.patch('/:id', auth.auth)
router.post('/register', userValidator.newUser, usersController.newUser)
router.post('/login', usersController.login)
router.post('/rental', auth.auth, usersController.checkOut)
router.patch('/rental/check-in', auth.auth, usersController.checkIn)

module.exports = router