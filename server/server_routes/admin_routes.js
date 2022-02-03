const { adminLogin } = require('../controllers/admin_controller.js')
const express = require('express')

const router = express.Router()

routes = [

    router.post('/login', adminLogin),

]

module.exports = routes