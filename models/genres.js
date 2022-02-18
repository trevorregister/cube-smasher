const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GenreSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Genre name required.'],
        unique: [true, 'Genre already exists']
    },
    createdAt: {
        type: Date
    }
})


var Genre = mongoose.model('Genre', GenreSchema)

module.exports = Genre



