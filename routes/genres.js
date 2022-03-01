const express = require('express')
const router = express.Router()
const genresController = require('../controllers/genresController')
const genreValidator = require('../middleware/validators/genre.validator')
const auth = require('../middleware/auth')

router.get('/', genresController.genres)
router.get('/:id', genresController.genre)
router.post('/', auth.auth, auth.role, genreValidator.newGenre, genresController.newGenre)
router.patch('/:id', auth.auth, auth.role, genreValidator.updateGenre, genresController.updateGenre) 
router.delete('/:id', auth.auth, auth.role, genresController.deleteGenre)

module.exports = router