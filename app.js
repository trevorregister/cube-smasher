const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const genres_routes = require('./routes/genres')

const app = express()
mongoose.connect(process.env.LOCAL_DB_URI)

app.use(express.json())
app.use('/api', genres_routes)



app.listen(process.env.PORT, ()=>console.log(`Listening on port ${process.env.PORT}...`))