const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Movie name required.'],
    },

    slug:{
        type: String,
        required: [true, 'Slug required.'],
        unique: true
    },

    createdAt: {
        type: Date
    },

    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    }],

    history: {
        type: Array 
    },

    yearReleased: {
        type: Number
    },

    status: {
        type: String,
        enum: {
            values: ['in', 'out'],
            message: [`status must be 'in' or 'out'`]
        }
    }
})


var Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie



