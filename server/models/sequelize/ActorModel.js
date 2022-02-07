const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../../config/database.js");
// const User = require("../sequelize/UserModel.js");
// const TvShow = require("../sequelize/TvShowModel.js");

const Actor = sequelize.define(
    "Actor",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Actor',
        tableName: 'actors',
        underscore: true,
    }
);

// Actor.belongsTo(TvShow)

module.exports = Actor