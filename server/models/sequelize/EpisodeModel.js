const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database.js");

const Episode = sequelize.define(
    "Episode",
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
        description:DataTypes.STRING,
        release_date: DataTypes.DATE,
        runtime: DataTypes.STRING,
    },
    {
        sequelize,
        modelName: 'Episode',
        tableName: 'episodes',
        underscore: true,
    }
);

/**
 * Export the model, so that it can be used in any
 * page to execute CRUD operations on the app_posts table.
 */
module.exports = Episode;