const Joi = require('joi')

exports.newUser = function (req, res, next){

    const JoiSchema = Joi.object({
        firstName: Joi.string()
        .trim()
        .min(1)
        .max(30)
        .required(),

        lastName: Joi.string()
        .trim()
        .min(1)
        .max(30)
        .required(),

        email: Joi.string()
        .trim()
        .min(1)
        .max(30)
        .email()
        .required(),

        password: Joi.string()
        .trim()
        .required(),

        role: Joi.string()
        .trim()
        .min(1)
        .max(10)
        .required()
    })

    const options = {abortEarly: false}

    const {error, value} = JoiSchema.validate(req.body, options)
    if (error) return res.status(422).send(`Validation error: ${error.details.map(x=>x.message).join(',')}`)

    else req.body = value
    next()
}