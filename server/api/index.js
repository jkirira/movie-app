const express = require('express');
const user_routes = require('../server_routes/user_routes.js')
const show_routes = require('../server_routes/show_routes.js')
const admin_routes = require('../server_routes/admin_routes.js')
const sequelize = require("../config/database.js");
// const UserModel = require('../models/sequelize/UserModel.js');
const models = require('../models/sequelize/relationships.js');
// const models.EpisodeModel = require('../models/sequelize/models.EpisodeModel.js');
// const models.SubscriptionModel = require('../models/sequelize/models.SubscriptionModel.js')
// const models.FavouriteModel = require('../models/sequelize/models.FavouriteModel.js')
// const models.ActorModel = require('../models/sequelize/models.ActorModel.js')
// const models.CommentModel = require('../models/sequelize/models.CommentModel.js')
// const models.RatingModel = require('../models/sequelize/models.RatingModel.js')
// const models.ReviewModel = require('../models/sequelize/models.ReviewModel.js')
const cors = require("cors");

const corsOptions ={
    origin:'*',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}


const app =  express();


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


        app.listen(4000, ()=>{
            console.log('Application Listening');
        });

    } catch (error) {
        console.error("Unable to connect to the database:", error.original);
    }
}

initApp();

