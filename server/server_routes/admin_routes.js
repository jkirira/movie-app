const { adminLogin } = require('../controllers/admin_controller.js')
const { getShowSubscriptions } = require('../controllers/subscription_controller.js')


const express = require('express')

const router = express.Router()

let routes = [

    router.post('/login', adminLogin),

    router.get('/show/:show_id/subscriptions', getShowSubscriptions),              // , authenticate

    // router.post('/show/:show_id/subscriptions/sendmail', sendManualMail),              // , authenticate



]

module.exports = routes