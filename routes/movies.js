const express = require('express')
const router = express.Router()
const moviesController = require('../controllers/moviesController')

router.get('/', moviesController.getMovies)
//router.get('/:slug', moviesController.getMovie)
router.get('/:id', moviesController.getMovieById)
router.post('/', moviesController.createMovie)
//router.patch('/:name', moviesController.updateMovie)
//router.delete('/:name', deletemovie)

module.exports = router