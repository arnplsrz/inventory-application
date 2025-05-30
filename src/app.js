const express = require('express')
const inventoryRoutes = require('./routes/inventoryRoutes')

const app = express()

app.set('view engine', 'ejs')
app.set('views', `${__dirname}/views`)
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', inventoryRoutes)

module.exports = app
