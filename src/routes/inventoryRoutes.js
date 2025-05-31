const express = require('express')
const router = express.Router()
const inventoryController = require('../controllers/inventoryController')

router.get('/', inventoryController.getAllGames)
router.get('/game/:id', inventoryController.getGameById)
router.get('/game/:id/edit', inventoryController.getEditGamePage)
router.post('/game/create', inventoryController.createGame)
router.post('/game/:id/edit', inventoryController.updateGame)
router.post('/game/:id', inventoryController.deleteGame)
router.get('/genres', inventoryController.getGenres)
router.get('/genres/:genre', inventoryController.getGamesByGenre)

module.exports = router
