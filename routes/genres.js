const express = require('express')
const router = express.Router()
const genresController = require('../controllers/genresController')

router.get('/', genresController.getGenres)
//router.get('/:slug', genresController.getGenre)
router.get('/:id', genresController.getGenreById)
router.post('/', genresController.createGenre)
router.patch('/:name', genresController.updateGenre) //update with slug
//router.delete('/:name', deleteGenre)

module.exports = router