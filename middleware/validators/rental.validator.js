const Joi = require ('joi')
Joi.objectId = require('joi-objectid')(Joi)

exports.createRental = function (req, res, next){
    const JoiSchema = Joi.object({
        user: Joi.objectId(),

        movie: Joi.objectId(),

        checkOutDate: Joi.date(),

        dueDate: Joi.date(),

        isLate: Joi.bool(),

        cost: Joi.number()
        .min(0)
    })

    const options = {abortEarly: false}

    const {error, value} = JoiSchema.validate(req.body, options)
    if(error) return res.status(422).send(`Validation error: ${error.details.map(x => x.message).join(',')}`)
    else req.body = value
    next()
}