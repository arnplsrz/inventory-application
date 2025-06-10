const query = require('../database/queries')

const getDevelopers = async (req, res) => {
  const developers = await query.getDevelopers()
  res.render('index', {
    title: 'All developers',
    content: 'pages/developers/index',
    developers,
  })
}

const getGamesByDeveloper = async (req, res) => {
  try {
    const developerId = req.params.id
    const data = await query.getGamesByDeveloper(developerId)
    res.render('index', {
      title: `Games by ${data.developerName}`,
      content: 'partials/games',
      games: data.games,
    })
  } catch (error) {
    res.redirect('/developers')
  }
}

const getCreateDeveloperPage = async (req, res) => {
  res.render('index', {
    title: 'Create',
    content: 'pages/developers/create',
  })
}

const createDeveloper = async (req, res) => {
  try {
    await query.createDeveloper(req.body.developer)
    res.redirect('/developers')
  } catch (error) {
    // TODO: Handle error for creating existing value
    res.redirect('/developers')
  }
}

module.exports = {
  getDevelopers,
  getGamesByDeveloper,
  getCreateDeveloperPage,
  createDeveloper,
}
