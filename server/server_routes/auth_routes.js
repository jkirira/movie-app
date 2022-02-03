const { login, register, logout } = require('../controllers/user_controller')
const express = require('express')
const {getUserSubscriptions, addSubscription, unsubscribe} = require("../controllers/subscription_controller");
const {getFavourites, addToFavourites, removeFromFavourites} = require("../controllers/favourite_controller");


const router = express.Router()

routes = [
    router.post('/login', login),
    router.post('/register', register),
    // router.post('/logout', logout),

    // router.post('/admin')
    router.get('/:user_id/unsubscribe/:show_id', unsubscribe),
    router.get('/:user_id/subscriptions', getUserSubscriptions),
    router.post('/:user_id/subscribe/:show_id', addSubscription),

    router.delete('/:user_id/favourites/remove/:show_id', removeFromFavourites),
    router.post('/:user_id/favourites/add', addToFavourites),
    router.get('/:user_id/favourites', getFavourites),


]

module.exports = routes