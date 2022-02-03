const { Sequelize, DataTypes } = require( "sequelize");
const sequelize =  require("../config/database.js");
const bcrypt = require("bcrypt");
const UserModel = require( "../models/sequelize/UserModel.js");
const jwt = require("jsonwebtoken")

async function adminLogin(req, res){
    try {


        let user = await UserModel.findOne({ where:{ email: req.body.email }})

        if( !user ){
            return res.json({"Error": "An error ocurred" })
        }

        if( !user.is_admin ){
            return res.json({"Error": "You are not authorized to perform this action"})
        }

        const password_match = await bcrypt.compare(req.body.password, user.password);
        if (password_match) {
            let Token = jwt.sign({ 'email': user.email, 'id': user.id.toString() }, "secret")
            res.status(200).json( {'success': "success", 'username': user.username, 'token': Token} )
        } else {
            res.status(404).json({'error': "User not Found"})
        }

    } catch(err) {
        return res.json({"Error": "Could not login", err})
    }
}

module.exports = { adminLogin }
