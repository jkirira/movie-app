const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../../config/database.js");
// const User = require("../sequelize/UserModel.js");
// const TvShow = require("../sequelize/TvShowModel.js");

const Comment = sequelize.define(
    "Comment",
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
        modelName: 'Comment',
        tableName: 'comments',
        underscore: true,
    }
);


module.exports = Comment