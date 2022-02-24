const User = require('../models/user')
const bcrypt = require('bcryptjs')

const saltRounds = 10

exports.registerUser = async function (req,res){
    try {
        var user = await User.findOne({"email":req.body.email.toLowerCase()})
        if (user) return res.status(400).send(`User with ${req.body.email} aleady exists`)

        const hash = await bcrypt.hash(req.body.password, saltRounds)

        var user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            rentals: [],
            accountStatus: "active",
            role: req.body.role,
            hash: hash,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })

        await user.save()
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
            return res.status(200).send('Login successful') //for authorization, remove return and add next() to auth route instead 
        }
        
        else return res.status(401).send('Email or password incorrect')
    }

    catch (error){
        return error
    }
}