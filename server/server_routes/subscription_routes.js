const{getShowSubscriptions, getUserSubscriptions, getSubscriptions, getSubscriptionById, addSubscription, deleteSubscription} = require('../controllers/subscription_controller.js')
const express = require('express')

const router = express.Router()

routes = [

    router.get('/', getSubscriptions),
    router.get('/:sub_id', getSubscriptionById),
    router.get('/show/:show_id', getShowSubscriptions),
    router.get('/user/:user_id', getUserSubscriptions),

    router.post('/', addSubscription),

    router.delete('/:sub_id', deleteSubscription)

]

module.exports = routes