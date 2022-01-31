const User = require('../models/user_model');
const jwt = require('jsonwebtoken')

var users = Array();

cors_url = 'http://localhost:8084';

function register(req, res){

    res.set('Access-Control-Allow-Origin', cors_url)
    res.set('Access-Control-Allow-Methods: POST');

    if( req.body.username == '' || req.body.password == '' ) {
        res.status(400).json({'error': "please fill all values"})
    }

    let userExists = users.find((user) => {
            user.username = req.body.username
    })

    if (userExists) {
        res.status(400).json({'error': "That username is taken"})
    }

    let u = new User(req.body.username, req.body.password)
    users.unshift(u)
    res.status(201).json({'success': "User created"})
}


function login(req, res){

    res.set('Access-Control-Allow-Origin', cors_url)
    res.set('Access-Control-Allow-Methods: POST');

    if( req.body.username == '' || req.body.password == '' ) {
        res.status(400).json({'error': "please fill all values"})
    }

    let userExists = users.find((user) => {
        user.username = req.body.username
    })

    if (!userExists) {
        res.status(404).json({'error': "User not Found"})
    }

    if(userExists.password == req.body.password){
        let Token = jwt.sign(userExists, secret)
        res.status(200).json( {username: userExists.username, token: Token} )
    } else {
        res.status(404).json({'error': "User not Found"})
    }

}

function logout(req, res){

    res.set('Access-Control-Allow-Origin', cors_url)
    res.set('Access-Control-Allow-Methods: POST');


    let userExists = users.find((user) => {
        user.username = req.body.username
    })

    if (!userExists) {
        res.status(404).json({'error': "User not Found"})
    }

    //logout functionality

}


module.exports = {login, register, logout}