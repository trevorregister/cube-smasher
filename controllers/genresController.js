const Genre = require('../models/genres')

exports.getGenres = async function(req, res){
    console.log('getGenres')
    try{
        const genres = await Genre.find()
        res.status(200).send(genres)
        return genres
    }
    catch (error){
        return error
    }
}

exports.getGenre = async function  (req,res){
    console.log('getGenre')
    try {
        const genre = Genre.findOne({"name":req.body.name})
        if(!genre){
            return res.status(400).send('Genre not found.')
        }
    
        return res.status(200).send(req.body.name)
    }
    catch (error){
        return error
    }
}

exports.createGenre = async function (req,res){
    console.log('createGenre')
    try {
        var genre = await Genre.findOne({"name":req.body.name})
        if(genre){
            return res.status(400).send('Genre already exists')
        }

        var genre = new Genre({
            name: req.body.name,
            createdAt: Date.now()
        })
    }
    catch (error){
        return error
    }

    await genre.save()

}


//module.exports = getGenre
//module.exports = createGenre

