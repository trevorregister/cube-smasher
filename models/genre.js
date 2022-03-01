const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GenreSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    slug: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: Date
})


var Genre = mongoose.model('Genre', GenreSchema)

module.exports = Genre



