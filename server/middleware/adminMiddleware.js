const jwt = require('jsonwebtoken')
const UserModel = require("../models/sequelize/UserModel.js")

//is_admin
async function authorize(req, res, next){
    console.log('checking admin');
    const user_object = res.locals.user_object;
    if (user_object){
        let user =  await UserModel.findOne( {where: { email: user_object.email } })

        if(user.is_admin){
            next();
        } else {
            return res.status(401).json({"Error": "You are not authorized to perform this function"})
        }

    } else {
        return res.status(401).send("Access Denied")
    }

}

module.exports = authorize
