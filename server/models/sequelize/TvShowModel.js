const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../../config/database.js");

const TvShow = sequelize.define(
    "TvShow",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type:DataTypes.STRING,
        release_date: DataTypes.DATE,
        trailer_link: DataTypes.STRING,
        description: DataTypes.STRING,
        poster: DataTypes.STRING,
    },
    {
        sequelize,
        modelName: 'TvShow',
        tableName: 'tv_shows',
        underscore: true,
    }
);

/**
 * Export the model, so that it can be used in any
 * page to execute CRUD operations on the app_posts table.
 */
module.exports = TvShow;