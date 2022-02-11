const express = require('express');
const fileUpload = require('express-fileupload');
// const statik = require('node-static');
const user_routes = require('./server_routes/user_routes.js')
const show_routes = require('./server_routes/show_routes.js')
const admin_routes = require('./server_routes/admin_routes.js')
const sequelize = require("./config/database.js");
const models = require('./models/sequelize/relationships.js');


const cors = require("cors");

const corsOptions ={
    origin:'*',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}



const app =  express();

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

app.use(cors(corsOptions))
app.use(express.json());

app.use('/api/v1/user', user_routes)
app.use('/api/v1/admin', admin_routes)
app.use('/api/v1/shows', show_routes)

// app.use('/api/v1/subscriptions', subscription_routes)
// app.use('/api/v1/comments', comment_routes)
// app.use('/api/v1/reviews', review_routes)
// app.use('/api/v1/favourites', favourite_routes)
// app.use('/api/v1/rating', rating_routes)

const initApp = async () => {
    console.log("Testing the database connection..");

    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        // sequelize.drop();

        // await models.User.sync({ alter: true });
        // await models.TvShow.sync({ alter: true });
        // await models.Episode.sync({ alter: true });
        // await models.Subscription.sync( {alter: true} )
        // await models.Favourite.sync( {alter: true} )
        // await models.Review.sync( {alter: true} )
        // await models.Rating.sync( {alter: true} )
        // await models.Comment.sync( {alter: true} )
        // await models.Actor.sync( {alter: true} )
        // await models.ActorTvShows.sync( {alter: true} )

        app.use(express.static('public'))
        app.get('/images/:name',(req,res)=>{
            res.sendFile(__dirname+"/public/"+req.params.name)
        })
        app.listen(4000, ()=>{
            console.log('Application Listening');
        });

    } catch (error) {
        console.error("Unable to connect to the database:", error.original);
    }
}

initApp();

