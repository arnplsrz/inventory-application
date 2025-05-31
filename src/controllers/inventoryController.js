const query = require('../database/queries')

const getAllGames = async (req, res) => {
  const games = await query.getAllGames()
  res.render('index', { title: 'All games', games })
}

const getGameById = async (req, res) => {
  const gameId = parseInt(req.params.id, 10)
  const game = await query.getGameById(gameId)
  res.render('game/index', { title: game.title, game })
}

const getGenres = async (req, res) => {
  const genres = await query.getGenres()
  res.render('genres/index', { title: 'Game Genres', genres })
}

const getGamesByGenre = async (req, res) => {
  const genre = req.params.genre
  const games = await query.getGamesByGenre(genre)
  res.render('genres/games', { title: `Games in Genre: ${genre}`, games })
}

const getEditGamePage = async (req, res) => {
  const gameId = parseInt(req.params.id, 10)
  const game = await query.getGameById(gameId)
  const genres = await query.getGenres()
  const developers = await query.getDevelopers()
  console.log(`Editing game with ID: ${gameId}`, game)
  res.render('game/edit', { title: `Edit Game: ${game.title}`, game, genres, developers })
}

const createGame = async (req, res) => {
  await query.createGame(req.body)
  res.redirect('/')
}

const updateGame = async (req, res) => {
  const { id } = req.params
  const { title, release_date, genres, developers } = req.body

  const normalize = val => (Array.isArray(val) ? val : val ? [val] : [])

  const gameId = parseInt(id, 10)
  const data = {
    title,
    release_date,
    genres: normalize(genres),
    developers: normalize(developers),
  }

  console.log(`Updating game with ID: ${id}`, data)

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
  getEditGamePage,
  createGame,
  updateGame,
  deleteGame,
  getGenres,
  getGamesByGenre,
}
