const express = require('express')
const router = express.Router()
const moviesController = require('../controllers/moviesController')
const movieValidator = require('../middleware/validators/movie.validator')

router.get('/', moviesController.movies)
router.get('/:id', moviesController.movie)
router.post('/', movieValidator.newMovie, moviesController.newMovie)
router.delete('/:id', moviesController.deletemovie)

module.exports = router