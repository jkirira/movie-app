const bcrypt = require('bcrypt')
const UserModel = require('../models/sequelize/UserModel.js')
const jwt = require('jsonwebtoken')

var users = Array();

async function register(req, res){
    if( !req.body.username || !req.body.email || !req.body.password ) {
        res.status(400).json({'error': "cannot enter null values"})
    }

    if( req.body.username == '' || req.body.email == ''|| req.body.password == '' ) {
        res.status(400).json({'error': "please fill all values"})
    }

    let user =  await UserModel.findOne( {where: { email: req.body.email } })

    if (user) {
        console.log(user)
        res.status(400).json({'error': "That email already exists"})
    }

    let hashed_password = await bcrypt.hash(req.body.password, 10)
    console.log("hello")

    await UserModel.create({
        username: req.body.username,
        email: req.body.email,
        password: hashed_password,
    })
        .then((result) => {
            return res.json({ message: "User created successfully!" });
        })
        .catch((error) => {
            console.log(error);
            return res.json({ message: "Unable to create a record!", error: error.response.data });
        });

}


async function login(req, res){

    if( !req.body.email || !req.body.password ) {
        res.status(400).json({'error': "cannot enter null values"})
    }

    if( req.body.email == '' || req.body.password == '' ) {
        res.status(400).json({'error': "please fill all values"})
    }
    console.log(req.body.email)

    let user =  await UserModel.findOne( {where: { email: req.body.email } })

    if ( !user ) {
        res.status(404).json({'error': "User not Found"})
    }

    const password_match = await bcrypt.compare(req.body.password, user.password);
    if (password_match) {
        let Token = jwt.sign({
            'email': user.email,
            'id': user.id.toString()
        }, "secret")
        res.status(200).json( {'success': "success", 'username': user.username, 'token': Token} )
    } else {
        res.status(404).json({'error': "User not Found"})
    }

}

function logout(req, res){

    let userExists = users.find((user) => {
        user.username = req.body.username
    })

    if (!userExists) {
        res.status(404).json({'error': "User not Found"})
    }

    //logout functionality

}


module.exports = {login, register, logout}