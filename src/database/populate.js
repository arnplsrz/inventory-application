const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const { Client } = require('pg')
dotenv.config()

const client = new Client({
  connectionString: process.env.DATABASE_URL,
})
client.connect()

const createTables = async () => {
  const schemaPath = path.join(__dirname, 'schema.sql')
  const queryText = fs.readFileSync(schemaPath, 'utf8')
  await client.query(queryText)
}

const insertData = async () => {
  const queryText = `
  INSERT INTO genre (name) VALUES
    ('Action'),
    ('Adventure'),
    ('RPG'),
    ('Strategy'),
    ('Simulation');
  
  INSERT INTO developer (name) VALUES
    ('Nintendo'),
    ('Ubisoft'),
    ('Bethesda'),
    ('Valve'),
    ('Square Enix');
  
  INSERT INTO game (title, release_date) VALUES
    ('The Legend of Zelda', '1986-02-21'),
    ('Half-Life', '1998-11-19'),
    ('The Elder Scrolls V: Skyrim', '2011-11-11'),
    ('SimCity', '1989-02-02'),
    ('Final Fantasy VII', '1997-01-31');
  
  INSERT INTO game_genre (game_id, genre_id) VALUES
    (1, 2), -- Zelda: Adventure
    (2, 1), -- Half-Life: Action
    (3, 3), -- Skyrim: RPG
    (4, 5), -- SimCity: Simulation
    (5, 3); -- FFVII: RPG
  
  INSERT INTO game_developer (game_id, developer_id) VALUES
    (1, 1), -- Zelda: Nintendo
    (2, 4), -- Half-Life: Valve
    (3, 3), -- Skyrim: Bethesda
    (4, 1), -- SimCity: Nintendo (example)
    (5, 5); -- FFVII: Square Enix
`
  await client.query(queryText)
}

const main = async () => {
  await createTables()
  await insertData()
  client.end()
}

main().catch(err => {
  console.error('Error executing query', err.stack)
})
