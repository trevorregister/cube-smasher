const Movie = require('../models/movie')
const slugify = require('slugify')

exports.movies = async function (req,res){
    try{
        var movies = await Movie.find()
        .sort('name')
        .populate('genres', ['name', 'slug'])
        return res.status(200).send(movies)
    }
    catch (error){
        return error
    } 
}

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

        movie = movie.save()
        return res.status(201).send(movie)
    }

    catch (error){
        return error
    }
}

exports.deleteMovie = async function (req,res) {
    try {
        await Movie.deleteOne({"_id": req.params.id}, (error)=>{
            return res.status(404).send(error.message)
        })
    }
    catch (error){
        return error
    }
}


