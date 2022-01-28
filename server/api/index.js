const jwt = require("jsonwebtoken");
const express = require('express');
const path = require('path');
const vehicleRoutes = require('../movie_router.js/vehicle_router')
const {login, register} = require('../controllers/user_controller')
// var cors = require('cors')




const app =  express();

app.use(express.json());


app.listen(4000, ()=>{
    console.log('Application Listening');
})

