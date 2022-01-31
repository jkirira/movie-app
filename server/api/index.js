const express = require('express');
const auth_routes = require('../server_routes/auth_routes')
const movie_routes = require('../server_routes/movie_routes.js')


const app =  express();

app.use(express.json());

app.use('/api/user', auth_routes)

app.use('/api/movies', movie_routes)


app.listen(4000, ()=>{
    console.log('Application Listening');
})

