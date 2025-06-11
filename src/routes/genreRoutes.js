const express = require('express')
const router = express.Router()
const genreController = require('../controllers/genreController')

router.get('/create', genreController.getCreateGenrePage)
router.post('/', genreController.createGenre)
router.get('/', genreController.getGenres)
router.get('/:id', genreController.getGamesByGenre)

module.exports = router
