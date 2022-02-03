const { getMovies, getMovieByName, getMovieById, addMovie, updateMovie, deleteMovie } = require('../controllers/tvshow_controller.js')
// const { getShowSubscriptions,} = require('../controllers/subscription_controller.js')
const express = require('express')

const router = express.Router()


routes = [

        router.get('/', getMovies),
        router.get('/:movie_id', getMovieById),
        router.get('/name/:movie_name', getMovieByName),

        router.post('/', addMovie),

        router.put('/:movie_id', updateMovie),

        router.delete('/:movie_id', deleteMovie),

        // router.get('/:show_id', getShowSubscriptions)
        // router.get('/:movie_id/rating', getRatings),
        // router.get('/:movie_id/rating/:id', getRating),
        // router.post('/:movie_id/rating', addRating),
        // router.put('/:movie_id/rating', updateRating),
        // router.delete('/:movie_id/rating', deleteRating),


]


module.exports = router