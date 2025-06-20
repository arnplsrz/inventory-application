const express = require('express')
const inventoryRoutes = require('./routes/inventoryRoutes')
const developerRoutes = require('./routes/developerRoutes')
const genreRoutes = require('./routes/genreRoutes')

const app = express()

app.use((req, res, next) => {
  res.header('Content-Security-Policy', "img-src 'self'")
  next()
})

app.set('view engine', 'ejs')
app.set('views', `${__dirname}/views`)
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', inventoryRoutes)
app.use('/developers', developerRoutes)
app.use('/genres', genreRoutes)

module.exports = app
