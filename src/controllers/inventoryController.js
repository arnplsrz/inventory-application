const query = require('../database/queries')

const getAllGames = async (req, res) => {
  const games = await query.getAllGames()
  res.render('index', { title: 'Get all inventory items', games })
}

module.exports = {
  getAllGames,
}
