const express = require('express')
const router = express.Router()
const developerController = require('../controllers/developerController')

router.get('/', developerController.getDevelopers)
router.get('/:developer', developerController.getGamesByDevelopers)

module.exports = router
