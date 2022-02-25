const express = require('express')
const router = express.Router()
const rentalsController = require('../controllers/rentalsController')
const rentalsValidator = require('../middleware/validators/rental.validator')
//const movieValidator = require('../middleware/validators/movie.validator')


router.post('/', rentalsValidator.createRental, rentalsController.createRental)


module.exports = router