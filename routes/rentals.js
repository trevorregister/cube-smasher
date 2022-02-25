const express = require('express')
const router = express.Router()
const rentalsController = require('../controllers/rentalsController')
//const movieValidator = require('../middleware/validators/movie.validator')


router.post('/', rentalsController.createRental)


module.exports = router