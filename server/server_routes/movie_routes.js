
const express = require('express')

const router = express.Router()


routes = [

        router.get('/', getMovies),
        router.get('/:movieId', getMoviebyId),
        router.get('/:movieName', getMoviebyName),
        router.get('/search/name=:movieName', searchByName),
        router.get('/search/genre=:Genre', searchGenre),


        router.post('/', addMovie),

        router.put('/:movieId', updateMovie),

        router.delete('/:movieId', deleteMovie),

]


module.exports = router