const express = require('express')
const router = express.Router()
const moviesController = require('../controllers/moviesController')
const movieValidator = require('../middleware/validators/movie.validator')
const auth = require('../middleware/auth')

router.get('/', moviesController.movies)
router.get('/:id', moviesController.movie)
router.post('/', auth.auth, auth.adminRole, movieValidator.newMovie, moviesController.newMovie)
router.delete('/:id', auth.auth, auth.superAdminRole, moviesController.deleteMovie)

module.exports = router