const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const genres_routes = require('./routes/genres')
const movies_routes = require('./routes/movies')
const login_routes = require('./routes/login')
const register_routes = require('./routes/register')
const user_routes = require('./routes/users')
const logger = require('./middleware/logger')

const app = express()
mongoose.connect(process.env.MONGO_URI)

app.use(express.json())
app.use('/', logger.log)
app.use('/api', genres_routes)
app.use('/api', movies_routes)
app.use('/api', user_routes)
//app.use('/register', register_routes)
//app.use('/login', login_routes)



app.listen(process.env.PORT, ()=>console.log(`Listening on port ${process.env.PORT}...`))