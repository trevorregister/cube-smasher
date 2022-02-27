const express = require('express')
const router = express.Router()
const genresController = require('../controllers/genresController')
const genreValidator = require('../middleware/validators/genre.validator')

router.get('/', genresController.genres)
//router.get('/:slug', genresController.getGenre)
router.get('/:id', genresController.genre)
router.post('/', genreValidator.newGenre, genresController.newGenre)
router.patch('/:id', genreValidator.updateGenre, genresController.updateGenre) //update with slug
//router.delete('/:name', deleteGenre)

module.exports = router