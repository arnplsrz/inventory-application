const express = require('express')
const router = express.Router()
const inventoryController = require('../controllers/inventoryController')

router.get('/', inventoryController.getAllGames)

module.exports = router
