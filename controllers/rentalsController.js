const Joi = require('joi')
const Rental = require('../models/rental')

const dailyRate = 5 
const rentalDays = 7 
const dailyLateFee = 2


exports.createRental = async function (req, res){
    try {
        
        const today = new Date()
        const dueDate = new Date()
        dueDate.setDate(today.getDate() + rentalDays)

        var rental = new Rental({
            movie: req.body.movie,
            rentedTo: req.body.user,
            checkOutDate: today,
            dueDate: dueDate,
            isLate: false,
            cost: dailyRate*rentalDays,
        })

        await rental.save()
        return res.status(200).send('Rental success')
    }
    catch (error){
        return error
    }
}




