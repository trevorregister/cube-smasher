const Joi = require('joi')
const express = require('express')
const router = express.Router()


exports.createMovie = function (req, res, next){ 
    const JoiSchema = Joi.object({
    
        name: Joi.string()
        .trim()
        .min(2)
        .max(30)
        .required(),

        yearReleased: Joi.number()
        .greater(1878)
        .integer()
        .less(new Date().getFullYear()+1)
        .required()

    })

    const options = {abortEarly: false}

    const {error, value} = JoiSchema.validate(req.body, options)
    if (error) return res.status(422).send(`Validation error: ${error.details.map(x => x.message).join(',')}`)

    else req.body = value
    next()


}

exports.updateMovie = function (req, res, next){ 
    const JoiSchema = Joi.object({
    
        name: Joi.string()
        .trim()
        .min(2)
        .max(30),

        yearReleased: Joi.number()
        .greater(1878)
        .integer()
        .less(new Date().getFullYear()+1)

    })

    const options = {abortEarly: false}

    const {error, value} = JoiSchema.validate(req.body, options)
    if (error) return res.status(422).send(`Validation error: ${error.details.map(x => x.message).join(',')}`)

    else req.body = value
    next()


}



