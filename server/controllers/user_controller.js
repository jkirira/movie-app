const bcrypt = require('bcrypt')
const { User, Favourite, Subscription, TvShow }= require('../models/sequelize/relationships.js')
const jwt = require('jsonwebtoken')

var users = Array();

async function register(req, res){
    if( !req.body.username || !req.body.email || !req.body.password ) {
        return res.status(400).json({'error': "cannot enter null values"})
    }

    if( req.body.username == '' || req.body.email == ''|| req.body.password == '' ) {
        return res.status(400).json({'error': "please fill all values"})
    }

    let user =  await User.findOne( {where: { email: req.body.email } })

    if (user) {
        console.log(user)
        return res.status(400).json({'error': "That email already exists"})
    }

    let hashed_password = await bcrypt.hash(req.body.password, 10)
    console.log("hello")

    await User.create({
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
       return res.status(400).json({'error': "cannot enter null values"})
    }

    if( req.body.email == '' || req.body.password == '' ) {
        return res.status(400).json({'error': "please fill all values"})
    }
    console.log(req.body.email)

    let user =  await User.findOne( {
        where: { email: req.body.email } ,
        include: [
            { model: Favourite, include: { model: TvShow } },
            { model: Subscription, include: { model: TvShow } }
        ],
    })

    if ( !user ) {
       return res.status(404).json({'error': "User not Found"})
    }

    const password_match = await bcrypt.compare(req.body.password, user.password);
    if (password_match) {
        let Token = jwt.sign({
            'email': user.email,
            'id': user.id.toString()
        }, "secret")
        return res.status(200).json( {'success': "success", 'user': user, 'token': Token} )
    } else {
        return res.status(404).json({'error': "User not Found"})
    }

}

async function getUser(req, res){
    try{
        let user =  await User.findOne( {
            where: { id: req.params.user_id },
            include: [ Favourite, Subscription ],
        })
        console.log(user)
        return res.json(user);
    } catch(err){
        return res.status(404).json({ 'error': 'User Not Found',})
    }

}

module.exports = {login, register, getUser}