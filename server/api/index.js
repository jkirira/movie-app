const express = require('express');
const auth_routes = require('../server_routes/auth_routes')
const movie_routes = require('../server_routes/movie_routes.js')
const sequelize = require("../config/database.js");
const UserModel = require('../models/sequelize/UserModel.js');
const MovieModel = require('../models/sequelize/MovieModel.js');
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

app.use('/api/v1/movies', movie_routes)

const initApp = async () => {
    console.log("Testing the database connection..");

    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        await UserModel.sync({ alter: true });
        await MovieModel.sync({ alter: true });

        app.listen(4000, ()=>{
            console.log('Application Listening');
        });

    } catch (error) {
        console.error("Unable to connect to the database:", error.original);
    }
}

initApp();

