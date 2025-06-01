const express = require('express')
const router = express.Router()
const inventoryController = require('../controllers/inventoryController')

router.get('/', inventoryController.getAllGames)
router.get('/game/create', inventoryController.getCreateGamePage)
router.post('/game/create', inventoryController.createGame)
router.get('/game/edit/:id', inventoryController.getEditGamePage)
router.post('/game/edit/:id', inventoryController.updateGame)
router.get('/game/:id', inventoryController.getGameById)
router.post('/game/:id', inventoryController.deleteGame)
router.get('/genres', inventoryController.getGenres)
router.get('/genres/:genre', inventoryController.getGamesByGenre)

module.exports = router
