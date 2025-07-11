const pool = require('./pool')

async function getAllGames() {
  const result = await pool.query(`
    SELECT
      g.id,
      g.title,
      g.release_date,
      ARRAY_AGG(DISTINCT ge.name) AS genres,
      ARRAY_AGG(DISTINCT d.name) AS developers
    FROM game g
    LEFT JOIN game_genre gg ON g.id = gg.game_id
    LEFT JOIN genre ge ON gg.genre_id = ge.id
    LEFT JOIN game_developer gd ON g.id = gd.game_id
    LEFT JOIN developer d ON gd.developer_id = d.id
    GROUP BY g.id, g.title, g.release_date
    ORDER BY g.id
  `)
  return result.rows
}

async function getGameById(gameId) {
  const result = await pool.query(
    `
    SELECT
      g.id,
      g.title,
      g.release_date,
      ARRAY_AGG(DISTINCT ge.name) AS genres,
      ARRAY_AGG(DISTINCT d.name) AS developers
    FROM game g
    LEFT JOIN game_genre gg ON g.id = gg.game_id
    LEFT JOIN genre ge ON gg.genre_id = ge.id
    LEFT JOIN game_developer gd ON g.id = gd.game_id
    LEFT JOIN developer d ON gd.developer_id = d.id
    WHERE g.id = $1
    GROUP BY g.id, g.title, g.release_date
  `,
    [gameId]
  )

  return result.rows[0]
}

async function createGame(game) {
  const { title, release_date, genres, developers } = game

  const result = await pool.query(
    `
    INSERT INTO game (title, release_date)
    VALUES ($1, $2)
    RETURNING id
  `,
    [title, release_date]
  )

  const gameId = result.rows[0].id

  if (genres && genres.length > 0) {
    for (const genre of genres) {
      await pool.query(
        `
        INSERT INTO game_genre (game_id, genre_id)
        VALUES ($1, (SELECT id FROM genre WHERE name = $2))
      `,
        [gameId, genre]
      )
    }
  }

  if (developers && developers.length > 0) {
    for (const developer of developers) {
      await pool.query(
        `
        INSERT INTO game_developer (game_id, developer_id)
        VALUES ($1, (SELECT id FROM developer WHERE name = $2))
      `,
        [gameId, developer]
      )
    }
  }

  return gameId
}

async function updateGame(gameId, game) {
  const { title, release_date, genres, developers } = game

  await pool.query(
    `
    UPDATE game
    SET title = $1, release_date = $2
    WHERE id = $3
  `,
    [title, release_date, gameId]
  )

  await pool.query(
    `
    DELETE FROM game_genre
    WHERE game_id = $1
  `,
    [gameId]
  )

  if (genres && genres.length > 0) {
    for (const genre of genres) {
      await pool.query(
        `
        INSERT INTO game_genre (game_id, genre_id)
        VALUES ($1, (SELECT id FROM genre WHERE name = $2))
      `,
        [gameId, genre]
      )
    }
  }

  await pool.query(
    `
    DELETE FROM game_developer
    WHERE game_id = $1
  `,
    [gameId]
  )

  if (developers && developers.length > 0) {
    for (const developer of developers) {
      await pool.query(
        `
        INSERT INTO game_developer (game_id, developer_id)
        VALUES ($1, (SELECT id FROM developer WHERE name = $2))
      `,
        [gameId, developer]
      )
    }
  }
}

async function deleteGame(gameId) {
  await pool.query(
    `
    DELETE FROM game
    WHERE id = $1
  `,
    [gameId]
  )
}

async function getGenres() {
  const result = await pool.query('SELECT * FROM genre ORDER BY name')
  return result.rows
}

async function getGamesByGenre(genreId) {
  const genres = await pool.query(`SELECT name FROM genre WHERE id = $1`, [genreId])
  if (genres.rows.length === 0) throw new Error(`Genre '${genreId}' does not exist in the database`)
  const genreName = genres.rows[0].name

  const result = await pool.query(
    `
    SELECT
      g.id,
      g.title,
      g.release_date,
      ARRAY_AGG(DISTINCT ge.name) AS genres,
      ARRAY_AGG(DISTINCT d.name) AS developers
    FROM game g
    LEFT JOIN game_genre gg ON g.id = gg.game_id
    LEFT JOIN genre ge ON gg.genre_id = ge.id
    LEFT JOIN game_developer gd ON g.id = gd.game_id
    LEFT JOIN developer d ON gd.developer_id = d.id
    WHERE ge.id = $1
    GROUP BY g.id, g.title, g.release_date
  `,
    [genreId]
  )

  return {
    genreName,
    games: result.rows,
  }
}

async function createGenre(name) {
  await pool.query(`INSERT INTO genre (name) VALUES ($1)`, [name])
}

async function getDevelopers() {
  const result = await pool.query('SELECT * FROM developer ORDER BY name')
  return result.rows
}

async function getGamesByDeveloper(developerId) {
  const developers = await pool.query(`SELECT name FROM developer WHERE id = $1`, [developerId])
  if (developers.rows.length === 0) throw new Error(`Developer ID '${developerId}' does not exist in the database`)
  const developerName = developers.rows[0].name

  const result = await pool.query(
    `
    SELECT
    g.id,
    g.title,
    g.release_date,
      ARRAY_AGG(DISTINCT ge.name) AS genres,
      ARRAY_AGG(DISTINCT d.name) AS developers
      FROM game g
      LEFT JOIN game_genre gg ON g.id = gg.game_id
      LEFT JOIN genre ge ON gg.genre_id = ge.id
      LEFT JOIN game_developer gd ON g.id = gd.game_id
      LEFT JOIN developer d ON gd.developer_id = d.id
      WHERE gd.developer_id = $1
      GROUP BY g.id, g.title, g.release_date
      `,
    [developerId]
  )

  return {
    developerName,
    games: result.rows,
  }
}

async function createDeveloper(name) {
  await pool.query(`INSERT INTO developer (name) VALUES ($1)`, [name])
}

module.exports = {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  getGenres,
  getGamesByGenre,
  createGenre,
  getDevelopers,
  getGamesByDeveloper,
  createDeveloper,
}
