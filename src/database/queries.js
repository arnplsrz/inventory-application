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

module.exports = {
  getAllGames,
}
