const { getMovies, getMovieByName, getMovieById, addMovie, updateMovie, deleteMovie } = require('../controllers/movie_controller.js')
const express = require('express')

const router = express.Router()


routes = [

        router.get('/', getMovies),
        router.get('/:movie_id', getMovieById),
        router.get('/:movie_name', getMovieByName),

        router.post('/', addMovie),

        router.put('/:movie_id', updateMovie),

        router.delete('/:movie_id', deleteMovie),

]


module.exports = router