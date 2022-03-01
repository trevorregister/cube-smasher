const Genre = require('../models/genre')
const slugify = require('slugify')

exports.genres = async function(req, res){
    try{
        const genres = await Genre.find().sort('name')
        res.status(200).send(genres)
        return genres
    }
    catch (error){
        return error
    }
}

exports.genre = async function (req,res){

    try {
        var genre = await Genre.findOne({"_id":req.params.id})
        
        if(!genre) return res.status(404).send(`Genre with ${req.params.id} not found`)
        return res.status(200).send(genre)
    }
    catch(error){
        return error
    }

}

exports.newGenre = async function (req,res){
    try {
        var genre = await Genre.findOne({"name":req.body.name})
        if(genre) return res.status(404).send('Genre already exists')

        var genre = new Genre({
            name: req.body.name,
            slug: slugify(req.body.name.toLowerCase()),
            createdAt: Date.now()
        })

       genre = await genre.save()
       return res.status(201).send(genre)
    }
    catch (error){
        return error
    } 

}

exports.updateGenre = async function (req,res){
    var genreId = req.params.id
    var newName = req.body.name

    try {
        var genre = await Genre.findOne({"_id":genreId})
        if(!genre) return res.status(404).send(` ${genreId} does not exist`)

        var newNameCheck = await Genre.findOne({"name":newName})
        if (newNameCheck) return res.status(403).send(`${newName} already exists`)

        genre.name = newName
        genre.slug = slugify(newName.toLowerCase())
        genre = await genre.save()
        return res.status(201).send(genre)
    }
    catch(error){
        return error
    }

}

exports.deleteGenre = async function(req, res){
    try {
        await Genre.deleteOne({"_id":req.params.id}, (err, result)=>{
            if (err) return res.status(400).send(err.message)
            else return res.status(200).send(result)
        })

    }
    catch(error){
        return error
    }
}


