const express = require('express')
const router = express.Router()
const moviesController = require('../controllers/moviesController')

router.get('/movies', moviesController.getMovies)
//router.get('/movies/:slug', moviesController.getMovie)
router.get('/movies/:id', moviesController.getMovieById)
router.post('/movies', moviesController.createMovie)
//router.patch('/movies/:name', moviesController.updateMovie)
//router.delete('/movie/:name', deletemovie)

module.exports = router