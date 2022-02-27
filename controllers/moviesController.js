const Movie = require('../models/movie')
const slugify = require('slugify')

exports.movies = async function (req,res){
    try{
        const movies = await Movie.find()
        res.status(200).send(movies)
        return movies
    }
    catch (error){
        return error
    } 
}

// exports.getMovie = async function  (req,res){
//     try {
//         const movie = await Movie.findOne({"slug":req.params.slug})
//         if(!movie) return res.status(400).send('Movie not found.')
    
//         return res.status(200).send(movie)
//     }
//     catch (error){
//         return error
//     }
// }

exports.movie = async function (req,res){
    try {
        const movie = await Movie.findOne({"_id":req.params.id})
        if(!movie) return res.status(400).send(`Movie with ${req.params.id} not found.`)
        return res.status(200).send(movie)
    }

    catch (error){
        return error
    }
}

exports.newMovie = async function (req,res){
    try {
        var movie = await Movie.findOne({"name":req.body.name})
        
        if(movie) return res.status(400).send(`Movie already exists`)

        var movie = new Movie({
            name: req.body.name,
            slug: slugify(req.body.name.toLowerCase()),
            createdAt: Date.now(),
            genres: [],
            history: [],
            status: 'in',
            yearReleased:req.body.yearReleased 
        })

        await movie.save()
        return res.status(201).send(`Movie ${movie} succesfully created.`)
    }

    catch (error){
        return error
    }
}


