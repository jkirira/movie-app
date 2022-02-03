const express = require('express');
const auth_routes = require('../server_routes/auth_routes')
const show_routes = require('../server_routes/show_routes.js')
const admin_routes = require('../server_routes/admin_routes.js')
const subscription_routes = require('../server_routes/subscription_routes.js')
const sequelize = require("../config/database.js");
const UserModel = require('../models/sequelize/UserModel.js');
const TvShowModel = require('../models/sequelize/TvShowModel.js');
const SubscriptionModel = require('../models/sequelize/SubscriptionModel.js')
const FavouriteModel = require('../models/sequelize/FavouriteModel.js')
const cors = require("cors");
const corsOptions ={
    origin:'*',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}


const app =  express();


app.use(cors(corsOptions))
app.use(express.json());

app.use('/api/v1/user', auth_routes)

app.use('/api/v1/admin', admin_routes)

app.use('/api/v1/shows', show_routes)

app.use('/api/v1/subscriptions', subscription_routes)

const initApp = async () => {
    console.log("Testing the database connection..");

    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        await UserModel.sync({ alter: true });
        await TvShowModel.sync({ alter: true });
        await SubscriptionModel.sync( {alter: true} )
        await FavouriteModel.sync( {force: true} )

        app.listen(4000, ()=>{
            console.log('Application Listening');
        });

    } catch (error) {
        console.error("Unable to connect to the database:", error.original);
    }
}

initApp();

