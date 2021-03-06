const Joi = require('joi')

exports.newGenre = function (req, res, next){ 
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

exports.updateGenre = function (req, res, next){
    const JoiSchema = Joi.object({

        newName: Joi.string()
        .trim()
        .required()
        .min(2)
        .max(30)
    })

    const options = {abortEarly: false}
    const {error, value} = JoiSchema.validate(req.body, options)
    if (error) return res.status(422).send(`Validation error: ${error.details.map(x=>x.message).join(',')}`)

    else req.body = value
    next()

}
