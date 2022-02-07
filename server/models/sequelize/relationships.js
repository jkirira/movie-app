const TvShow = require ('./TvShowModel.js');
const User = require ('./UserModel.js');
const Subscription = require ('./SubscriptionModel.js');
const Episode = require('./EpisodeModel.js')
const Comment = require('./CommentModel.js')
const Review = require('./ReviewModel.js')
const Rating = require('./RatingModel.js')
const Actor = require('./ActorModel.js')
const Favourite = require('./FavouriteModel.js')

// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = require("../../config/database.js");

User.hasMany(Favourite, {foreignKey: 'user_id', onDelete: 'CASCADE'})
Favourite.belongsTo(User)

User.hasMany(Subscription, {foreignKey: 'user_id', onDelete: 'CASCADE'})
Subscription.belongsTo(User)

TvShow.hasMany(Subscription, {foreignKey: 'show_id', onDelete: 'CASCADE'})
Subscription.belongsTo(TvShow)

TvShow.hasMany(Episode, {foreignKey: 'show_id', onDelete: 'CASCADE'});
Episode.belongsTo(TvShow)

TvShow.hasMany(Comment, {foreignKey: 'show_id', onDelete: 'CASCADE'});
Comment.belongsTo(TvShow)

TvShow.hasMany(Review, {foreignKey: 'show_id', onDelete: 'CASCADE'})
Review.belongsTo(TvShow)

TvShow.hasMany(Rating, {foreignKey: 'show_id', onDelete: 'CASCADE'})
Rating.belongsTo(TvShow)

// const ActorTvShows = sequelize.define('ActorTvShows', {
//     TvShowId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: TvShow, // 'Movies' would also work
//             key: 'id'
//         }
//     },
//     ActorId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: Actor, // 'Actors' would also work
//             key: 'id'
//         }
//     }
// });
//
//
// TvShow.belongsToMany(Actor, { through: ActorTvShows });
// Actor.belongsToMany(TvShow, { through: ActorTvShows });


module.exports = {
    User,
    TvShow,
    Subscription,
    Episode,
    Comment,
    Review,
    Rating,
    Actor,
    Favourite
};