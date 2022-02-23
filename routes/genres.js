const express = require('express')
const router = express.Router()
const genresController = require('../controllers/genresController')
const genreValidator = require('../middleware/validators/genre.validator')

router.get('/', genresController.getGenres)
//router.get('/:slug', genresController.getGenre)
router.get('/:id', genresController.getGenreById)
router.post('/', genreValidator.createGenre, genresController.createGenre)
router.patch('/:name', genreValidator.updateGenre, genresController.updateGenre) //update with slug
//router.delete('/:name', deleteGenre)

module.exports = router