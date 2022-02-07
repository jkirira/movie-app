const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../../config/database.js");
// const User = require("../sequelize/UserModel.js");
// const TvShow = require("../sequelize/TvShowModel.js");

const Favourite = sequelize.define(
    "Favourite",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
    },
    {
        sequelize,
        modelName: 'Favourite',
        tableName: 'favourites',
        underscore: true,
    }
);

// Favourite.belongsTo(User)
// Favourite.belongsTo(TvShow)

module.exports = Favourite