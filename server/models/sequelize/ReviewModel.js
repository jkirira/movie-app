const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../../config/database.js");
// const User = require("../sequelize/UserModel.js");
// const TvShow = require("../sequelize/TvShowModel.js");

const Review = sequelize.define(
    "Review",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Review',
        tableName: 'reviews',
        underscore: true,
    }
);

// Review.belongsTo(User)
// Review.belongsTo(TvShow)

module.exports = Review