const User = require('../models/user')

exports.createUser = async function (req,res){
    
    try {
        var user = await User.findOne({"email":req.body.email.toLowerCase()})
        if (user) return res.status(400).send(`User with ${req.body.email} aleady exists`)

        var user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            rentals: [],
            accountStatus: "active",
            role: "superAdmin",
            hash: 'hash',
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