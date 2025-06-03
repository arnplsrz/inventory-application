const query = require('../database/queries')

const getDevelopers = async (req, res) => {
  const developers = await query.getDevelopers()
  res.render('index', {
    title: 'All developers',
    content: 'pages/developers/index',
    developers,
  })
}

const getGamesByDevelopers = async (req, res) => {
  try {
    const developer = req.params.developer
    const games = await query.getGamesByDevelopers(developer)
    res.render('index', {
      title: `Games by ${developer}`,
      content: 'partials/games',
      games,
    })
  } catch (error) {
    res.redirect('/developers')
  }
}

module.exports = {
  getDevelopers,
  getGamesByDevelopers,
}
