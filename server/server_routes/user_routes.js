const { login, register, logout } = require('../controllers/user_controller')
const express = require('express')
const {getUserSubscriptions, addSubscription, unsubscribe} = require("../controllers/subscription_controller");

const router = express.Router()

routes = [



    router.get('/:user_id/unsubscribe/:show_id', unsubscribe),
    router.post('/:user_id/subscribe/:show_id', addSubscription),
    router.post('/:user_id/subscriptions', getUserSubscriptions),

]

module.exports = routes