const express = require('express')
const router = express.Router()
const genresController = require('../controllers/genresController')

router.get('/genres', genresController.getGenres)
//router.get('/genres/:slug', genresController.getGenre)
router.get('/genres/:id', genresController.getGenreById)
router.post('/genres', genresController.createGenre)
router.patch('/genres/:name', genresController.updateGenre) //update with slug
//router.delete('/genre/:name', deleteGenre)

module.exports = router