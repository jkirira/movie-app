const { login, register, logout } = require('../controllers/user_controller')
const express = require('express')

const router = express.Router()

routes = [
    router.post('/login', login),
    router.post('/signup', register),
    router.post('/logout', logout)
]


module.exports = routes