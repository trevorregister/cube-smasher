const { boolean, number } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RentalSchema = new Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true 
    },
    
    rentedTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    
    checkOutDate: {
        type: Date,
        required: true
    },

    dueDate:{
        type: Date,
        required: true
    },

    isLate:{
        type: Boolean,
        required: true
    },

    cost:{
        type: Number,
        required: true,
        min: 0 
    },
})

var Rental = mongoose.model('Rental', RentalSchema)

module.exports = Rental