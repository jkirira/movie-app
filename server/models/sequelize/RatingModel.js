const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../../config/database.js");
// const User = require("../sequelize/UserModel.js");
// const TvShow = require("../sequelize/TvShowModel.js");

const Rating = sequelize.define(
    "Rating",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Rating',
        tableName: 'ratings',
        underscore: true,
    }
);

// Rating.belongsTo(User)
// Rating.belongsTo(TvShow)

module.exports = Rating