const TvShow = require ('./TvShowModel.js');
const Actor = require('./ActorModel.js')

const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database.js");

const ActorShows = sequelize.define('ActorShows', {
    MovieId: {
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