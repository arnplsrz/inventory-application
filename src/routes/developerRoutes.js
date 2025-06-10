const express = require('express')
const router = express.Router()
const developerController = require('../controllers/developerController')

router.get('/create', developerController.getCreateDeveloperPage)
router.post('/create', developerController.createDeveloper)
router.get('/', developerController.getDevelopers)
router.get('/:id', developerController.getGamesByDeveloper)

module.exports = router
