const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../../config/database.js");
const User = require("../sequelize/UserModel.js");
const TvShow = require("../sequelize/TvShowModel.js");

const Subscription = sequelize.define(
    "Subscription",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        show_id: {
            type: DataTypes.INTEGER,
            references: {
                model: TvShow,
                key: 'id',
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            }
        },
    },{
        sequelize,
        modelName: 'Subscription',
        tableName: 'subscriptions',
        underscore: true,
    }
)

module.exports = Subscription