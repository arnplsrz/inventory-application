const query = require('../database/queries')

const normalize = val => (Array.isArray(val) ? val : val ? [val] : [])

const getAllGames = async (req, res) => {
  const games = await query.getAllGames()
  res.render('index', {
    content: 'pages/home/index',
    title: 'All games',
    games,
  })
}

const getGameById = async (req, res) => {
  const gameId = parseInt(req.params.id, 10)
  const game = await query.getGameById(gameId)
  res.render('index', { title: game.title, content: 'pages/game/index', game })
}

const getGenres = async (req, res) => {
  const genres = await query.getGenres()
  res.render('index', {
    title: 'Game Genres',
    content: 'pages/genres/index',
    genres,
  })
}

const getGamesByGenre = async (req, res) => {
  const genre = req.params.genre
  const games = await query.getGamesByGenre(genre)
  res.render('index', {
    title: `Games in Genre: ${genre}`,
    content: 'pages/genres/games',
    games,
  })
}

const getCreateGamePage = async (req, res) => {
  const genres = await query.getGenres()
  const developers = await query.getDevelopers()

  res.render('index', {
    title: 'Create',
    content: 'pages/game/create',
    genres,
    developers,
  })
}

const getEditGamePage = async (req, res) => {
  const gameId = parseInt(req.params.id, 10)
  const game = await query.getGameById(gameId)
  const genres = await query.getGenres()
  const developers = await query.getDevelopers()
  res.render('index', {
    title: `Edit Game: ${game.title}`,
    content: 'pages/game/edit',
    game,
    genres,
    developers,
  })
}

const createGame = async (req, res) => {
  const { title, release_date, genres, developers } = req.body
  const data = {
    title,
    release_date,
    genres: normalize(genres),
    developers: normalize(developers),
  }

  await query.createGame(data)
  res.redirect('/')
}

const updateGame = async (req, res) => {
  const { id } = req.params
  const { title, release_date, genres, developers } = req.body

  const gameId = parseInt(id, 10)
  const data = {
    title,
    release_date,
    genres: normalize(genres),
    developers: normalize(developers),
  }

  await query.updateGame(gameId, data)
  res.redirect(`/game/${gameId}`)
}

const deleteGame = async (req, res) => {
  const gameId = parseInt(req.params.id, 10)
  await query.deleteGame(gameId)
  res.redirect('/')
}

module.exports = {
  getAllGames,
  getGameById,
  getCreateGamePage,
  getEditGamePage,
  createGame,
  updateGame,
  deleteGame,
  getGenres,
  getGamesByGenre,
}
