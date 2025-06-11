const query = require('../database/queries')

const getGenres = async (req, res) => {
  const genres = await query.getGenres()
  res.render('index', {
    title: 'All genres',
    content: 'pages/genres/index',
    genres,
  })
}

const getGamesByGenre = async (req, res) => {
  try {
    const genreId = req.params.id
    const data = await query.getGamesByGenre(genreId)
    res.render('index', {
      title: `Games by ${data.genreName}`,
      content: 'partials/games',
      games: data.games,
    })
  } catch (error) {
    res.redirect('/genres')
  }
}

const getCreateGenrePage = async (req, res) => {
  res.render('index', {
    title: 'Create a new genre',
    content: 'pages/genres/create',
  })
}

const createGenre = async (req, res) => {
  try {
    await query.createGenre(req.body.genre)
    res.redirect('/genres')
  } catch (error) {
    res.render('index', {
      title: 'Create a new genre',
      content: 'pages/genres/create',
      error: 'Failed to create genre',
    })
  }
}

module.exports = {
  getGenres,
  getGamesByGenre,
  getCreateGenrePage,
  createGenre,
}
