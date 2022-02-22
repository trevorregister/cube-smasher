const Genre = require('../models/genre')
const slguify = require('slugify')



exports.getGenres = async function(req, res){
    try{
        const genres = await Genre.find()
        res.status(200).send(genres)
        return genres
    }
    catch (error){
        return error
    }
}

// exports.getGenre = async function  (req,res){
//     try {
//         const genre = await Genre.findOne({"slug":req.params.slug})
//         if(!genre) return res.status(400).send('Genre not found.')

//         return res.status(200).send(genre)
//     }
//     catch (error){
//         return error
//     }
// }

exports.getGenreById = async function (req,res){

    try {
        const genre = await Genre.findOne({"_id":req.params.id})
        if(!genre) return res.status(400).send(`Genre with ${req.params.id} not found`)
        return res.status(200).send(genre)
    }
    catch(error){
        return error
    }

}

exports.createGenre = async function (req,res){
    try {
        var genre = await Genre.findOne({"name":req.body.name})
        if(genre) return res.status(400).send('Genre already exists')

        var genre = new Genre({
            name: req.body.name,
            slug: slugify(req.body.name.toLowerCase()),
            createdAt: Date.now()
        })

        await genre.save()
    }
    catch (error){
        return error
    }


    return res.status(201).send(`Genre with name ${genre.name} created.`)

}

exports.updateGenre = async function (req,res){
    var name = req.params.name
    var newName = req.body.newName

    try {
        var genre = await Genre.findOne({"name":name})
        if(!genre){
            return res.status(400).send('Genre does not exist')
        }

        genre.name = newName
        await genre.save()
        res.status(201).send('Name update successful')
    }
    catch(error){
        return error
    }

}


