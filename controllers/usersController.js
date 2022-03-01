const User = require('../models/user')
const Movie = require('../models/movie')
const bcrypt = require('bcryptjs')
const saltRounds = 10
const dailyRate = 5
const rentalDays = 7


exports.newUser = async function (req,res){
    try {
        var user = await User.findOne({"email":req.body.email.toLowerCase()})
        if (user) return res.status(400).send(`User with ${req.body.email} aleady exists`)

        const hash = await bcrypt.hash(req.body.password, saltRounds)

        var user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            rentals: [],
            history: [],
            accountStatus: "active",
            role: req.body.role,
            hash: hash,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })

        user = await user.save()
        return res.status(201).send('User successfully created')
    }
    catch (error){
        return error
    }
}

exports.login = async function (req, res){
    try {
        const user = await User.findOne({"email":req.body.email.toLowerCase()})

        if(user && await bcrypt.compare(req.body.password, user.hash)){
            const token = user.generateAuthToken()
            res.status(200).header('x-auth-token', token).send(user)
        }

        else return res.status(401).send('Username or password incorrect')
    }

    catch (error){
        return error
    }
}

exports.checkOut = async function(req, res){

    try{
        const movie = await Movie.findOne({"slug":req.body.slug})
        const user = await User.findOne({"email": req.body.email})

        if(!user) return res.status(404).send(`User ${req.body.email} not found.`)
        if(!movie) return res.status(404).send('Movie not found')
        if(movie.status === 'out') return res.status(422).send(`${movie.name} is currently out of stock`)
        
        const today = new Date()
        const dueDate = new Date()
        dueDate.setDate(today.getDate() + rentalDays)
        const cost = dailyRate*rentalDays

        var rental = {
            movie: movie,
            checkOutDate: today,
            dueDate: dueDate,
            isLate: false,
            cost: cost,
        }

        user.rentals.push(rental)
        movie.status = 'out'
        await user.save()
        await movie.save()

        return res.status(201).send('Rental success')
    }
    
    catch (error){
        return error
    }
}

exports.checkIn = async function(req, res){
    try{
        var movie = await Movie.findOne({"slug":req.body.slug})
        var user = await User.findOne({"email": req.body.email})

        if(!user) return res.status(404).send(`User ${req.body.email} not found.`)
        if(!movie) return res.status(404).send(`Movie ${req.body.slug} not found.`)

        for(var index in user.rentals){ //find rental. Can probably optomize with a single query.
            if(user.rentals[index].movie.slug === req.body.slug){
                //user.history.push(user.rentals[index])
                user.rentals.splice(index, 1)
                movie.status = 'in'
                await user.save()
                await movie.save()
                return res.status(200).send(`${movie.name} checked in`)
            }
        }

        return res.status(404).send('rental not found')
    }

    catch(error){
        return error
    }
}

exports.currentUser = async function (req, res) {
    var user = await User.find({"_id":req.user._id}).select('-hash')
    res.send(user)
}
