const { getMovies, getMovieByName, getMovieById, addMovie, updateMovie, deleteMovie } = require('../controllers/tvshow_controller.js')
const { getComments, getComment, addComment, updateComment, deleteComment } = require("../controllers/comment_controller.js")
const { getReviews, getReview, addReview, updateReview, deleteReview } = require("../controllers/review_controller.js")
const { getMovieRating, getUserRating, getRating, addRating, updateRating, deleteRating } = require("../controllers/rating_controller.js")
const { getActors, getActor, addActor, updateActor, deleteActor } = require("../controllers/actor_controller.js")
const { getFavourites, getFavourite, addToFavourites, removeFromFavourites, deleteFavourite } = require('../controllers/favourite_controller.js')
const { getShowSubscriptions, getUserSubscriptions, getSubscriptions, getSubscriptionById, addSubscription, deleteSubscription, removeSubscription} = require('../controllers/subscription_controller.js')

const { getEpisodes, getShowEpisodes, getEpisodeById, getEpisodeByName, addEpisode, updateEpisode, deleteEpisode } = require('../controllers/episode_controller.js')

const authorize = require('../middleware/adminMiddleware.js')
const authenticate = require('../middleware/authMiddleware.js')
// const { getShowSubscriptions,} = require('../controllers/subscription_controller.js')
const express = require('express')

const router = express.Router()


routes = [

        router.get('/', getMovies),

        //eager loading
        router.get('/:movie_id', getMovieById),

        router.get('/search/:movie_name', getMovieByName),

        router.post('/', addMovie),     // authenticate, authorize,

        router.put('/:movie_id', updateMovie),  // authenticate, authorize,

        router.delete('/:movie_id', deleteMovie),       // authenticate, authorize,


        router.get('/:show_id/comments', getComments),
        router.get('/:show_id/comments/:comment_id', getComment),        //, authenticate
        router.post('/:show_id/comments/', addComment),       //, authenticate
        router.put('/:show_id/comments/:comment_id', updateComment),     //, authenticate
        router.delete('/:show_id/comments/:comment_id', deleteComment),  //, authenticate

        router.get('/:show_id/episodes', getShowEpisodes),
        router.get('/:show_id/episodes/:episode_id', getEpisodeById),        //, authenticate
        router.post('/:show_id/episodes/', addEpisode),       //, authenticate
        router.put('/:show_id/episodes/:episode_id', updateEpisode),     //, authenticate
        router.delete('/:show_id/episodes/:episode_id', deleteEpisode),  //, authenticate

        router.get('/:show_id/reviews', getReviews),
        router.get('/:show_id/reviews/:review_id', getReview),   //, authenticate
        router.post('/:show_id/reviews/', addReview),  //, authenticate
        router.put('/:show_id/reviews/:review_id', updateReview),        //, authenticate
        router.delete('/:show_id/reviews/:review_id', deleteReview),     //, authenticate

        router.get('/:show_id/rating', getMovieRating),
        router.get('/:show_id/ratings/user/:user_id', getUserRating),                    //, authenticate
        router.get('/:show_id/ratings/:rating_id', getRating),   //, authenticate
        router.post('/:show_id/ratings/user/:user_id', addRating),                    //, authenticate
        router.put('/:show_id/ratings/:rating_id', updateRating),        //, authenticate
        router.delete('/:show_id/ratings/:rating_id', deleteRating),     //, authenticate

        router.get('/:show_id/actors', getActors),
        router.get('/:show_id/actors/:actor_id', getActor),
        router.post('/:show_id/actors', addActor),              // authenticate, authorize,
        router.put('/:show_id/actor/:actor_id', updateActor),   // authenticate, authorize,
        router.delete('/:show_id/actor/:actor_id', deleteActor),        // authenticate, authorize,

        // router.post('/:show_id/genre', addGenre),       // authenticate, authorize,
        // router.get('/:show_id/genre', getGenre),
        // router.put('/:show_id/genre', updateGenre),     // authenticate, authorize,
        // router.delete('/:show_id/genre', removeGenre),  // authenticate, authorize,

        router.get('/favourite/user/:user_id', getFavourites),              // , authenticate// , authenticate
        router.get('/:show_id/favourite/:fav_id', getFavourite),              // , authenticate
        router.post('/:show_id/favourite/user/:user_id', addToFavourites),              // , authenticate
        router.delete('/favourite/user/:user_id/:fav_id', deleteFavourite),              // , authenticate
        // router.delete('/:show_id/favourite/:fav_id', deleteFavourite),               // , authenticate

        router.get('/subscriptions/user/:user_id', getUserSubscriptions),              // , authenticate
        router.get('/subscriptions/:sub_id', getSubscriptionById),              // , authenticate
        router.get('/:show_id/subscriptions', getShowSubscriptions),              // , authenticate
        router.post('/:show_id/subscriptions/user/:user_id', addSubscription),         // , authenticate
        router.delete('/:show_id/subscriptions/user/:user_id', removeSubscription),         // , authenticate
        router.delete('/subscriptions/user/:user_id/:sub_id', deleteSubscription),              // , authenticate

]


module.exports = routes