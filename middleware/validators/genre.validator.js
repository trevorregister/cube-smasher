const Joi = require('joi')
const express = require('express')
const router = express.Router()


exports.createGenre = function (req, res, next){ 
    const JoiSchema = Joi.object({
    
        name: Joi.string()
        .trim()
        .min(2)
        .max(30)
        .required(),

    })

    const options = {abortEarly: false}

    const {error, value} = JoiSchema.validate(req.body, options)
    if (error) return res.status(422).send(`Validation error: ${error.details.map(x => x.message).join(',')}`)

    else req.body = value
    next()


}

//const testGenre = {name: "Act??ion", slug:"ac33&tion", createdAt: Date.now()}

//validateGenre(testGenre)

