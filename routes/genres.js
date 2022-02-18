const express = require('express')
const router = express.Router()
const genresController = require('../controllers/genresController')

router.get('/genres', genresController.getGenres)
router.get('/genres/:name', genresController.getGenre)
router.post('/genres/:name', genresController.createGenre)
//router.put('/genre/:name', updateGenre)
//router.delete('/genre/:name', deleteGenre)

module.exports = router