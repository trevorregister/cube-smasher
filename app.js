const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const genres_routes = require('./routes/genres')
const movies_routes = require('./routes/movies')
const user_routes = require('./routes/users')
const morgan = require('morgan')

const app = express()
mongoose.connect(process.env.MONGO_URI, ()=>console.log('Connected to database...'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(morgan('dev'))
app.use('/api/genres', genres_routes)
app.use('/api/movies', movies_routes)
app.use('/api/users', user_routes)

app.listen(process.env.PORT, ()=>console.log(`Listening on port ${process.env.PORT}...`))