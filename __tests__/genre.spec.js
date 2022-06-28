
const genresController = require('../controllers/genresController')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_TEST, ()=>console.log('Connected to database...'))

describe('Create new genre', ()=>{
    let testGenre = {name:"test12 3"}

    test('write new genre to db', ()=>{

        expect(genresController.newGenre(testGenre).tobe({
            name:"test12 3",
            slug:"test12-3",
            createdAt: Date.now()
        }))
    })
})