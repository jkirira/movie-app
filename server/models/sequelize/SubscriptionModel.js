const { Sequelize, DataTypes } = require("sequelize");
const TvShow = require('./TvShowModel.js')

const sequelize = require("../../config/database.js");
// const User = require("../sequelize/UserModel.js");
// const TvShow = require("../sequelize/TvShowModel.js");

const Subscription = sequelize.define(
    "Subscription",
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
        modelName: 'Subscription',
        tableName: 'subscriptions',
        underscore: true,
    }
);

// Subscription.belongsTo(User)


module.exports = Subscription