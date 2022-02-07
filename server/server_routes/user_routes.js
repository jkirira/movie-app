const { login, register, logout } = require('../controllers/user_controller.js')
// const show_routes = require('./show_routes.js')
// const {getUserSubscriptions, addSubscription, unsubscribe} = require("../controllers/subscription_controller.js");
// const {getFavourites, addToFavourites, removeFromFavourites} = require("../controllers/favourite_controller.js");
const express = require('express')

const router = express.Router()

routes = [
    router.post('/login', login),
    router.post('/register', register),

    // router.use('/:user_id/shows', show_routes),
    //
    // router.use('/:user_id/show/:show_id/ratings', rating_routes),
    //
    // router.use('/:user_id/shows/:show_id/reviews', review_routes),
    //
    // router.use('/:user_id/shows/:show_id/comments', comment_routes),
    // router.use('/:user_id/comments/', comment_routes),
    //
    // router.use('/:user_id/subscriptions', subscription_routes),
    //
    // // router.use('/:user_id/actors', subscription_routes),
    //
    // router.use('/:user_id/favourites', favourite_routes),

]

module.exports = routes