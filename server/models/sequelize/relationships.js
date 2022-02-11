const TvShow = require ('./TvShowModel.js');
const User = require ('./UserModel.js');
const Subscription = require ('./SubscriptionModel.js');
const Episode = require('./EpisodeModel.js')
const Comment = require('./CommentModel.js')
const Review = require('./ReviewModel.js')
const Rating = require('./RatingModel.js')
const Actor = require('./ActorModel.js')
const Favourite = require('./FavouriteModel.js')

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database.js");

User.hasMany(Favourite, { onDelete: 'CASCADE'})
Favourite.belongsTo(User)

User.hasMany(Subscription, { onDelete: 'CASCADE'})
Subscription.belongsTo(User)

User.hasMany(Rating, { onDelete: 'CASCADE'})
Rating.belongsTo(User)

TvShow.hasMany(Subscription, { onDelete: 'CASCADE'})
Subscription.belongsTo(TvShow)

TvShow.hasMany(Episode, { onDelete: 'CASCADE'});
Episode.belongsTo(TvShow)

TvShow.hasMany(Comment, { onDelete: 'CASCADE'});
Comment.belongsTo(TvShow)

TvShow.hasMany(Review, { onDelete: 'CASCADE'})
Review.belongsTo(TvShow)

TvShow.hasMany(Rating, { onDelete: 'CASCADE'})
Rating.belongsTo(TvShow)

TvShow.hasMany(Favourite, { onDelete: 'CASCADE'})
Favourite.belongsTo(TvShow)

const ActorTvShows = sequelize.define('ActorTvShows', {
    TvShowId: {
        type: DataTypes.INTEGER,
        references: {
            model: TvShow, // 'Movies' would also work
            key: 'id'
        }
    },
    ActorId: {
        type: DataTypes.INTEGER,
        references: {
            model: Actor, // 'Actors' would also work
            key: 'id'
        }
    }
});


TvShow.belongsToMany(Actor, { through: ActorTvShows });
Actor.belongsToMany(TvShow, { through: ActorTvShows });


module.exports = {
    User,
    TvShow,
    Subscription,
    Episode,
    Comment,
    Review,
    Rating,
    Actor,
    Favourite,
    ActorTvShows
};