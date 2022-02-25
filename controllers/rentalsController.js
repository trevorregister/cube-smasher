const Joi = require('joi')
const Movie = require('../models/movie')
const Rental = require('../models/rental')
const User = require('../models/user')

const dailyRate = 5 
const rentalDays = 7 
const dailyLateFee = 2


exports.createRental = async function (req, res){
    try {
        const user = await User.findOne({"_id":req.body.user})
        const movie = await Movie.findOne({"_id":req.body.movie})

        if(!user) return res.status(400).send('User not found') //won't engage if input isn't object id. fix in joi validation
        if(!movie) return res.status(400).send('Movie not found') //won't engage if input isn't object id. fix in joi validation
        if(movie.status === 'out') return res.status(403).send('Movie out of stock')

        const today = new Date()
        const dueDate = new Date()
        dueDate.setDate(today.getDate() + rentalDays)

        var rental = new Rental({
            movie: movie,
            rentedTo: user,
            checkOutDate: today,
            dueDate: dueDate,
            isLate: false,
            cost: dailyRate*rentalDays,
        })

        movie.status = 'out'
        user.rentals.push(rental._id)
        await movie.save()
        await user.save()
        await rental.save()
        return res.status(200).send('Rental success')
    }
    catch (error){
        return error
    }
}




