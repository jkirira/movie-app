const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../../config/database.js");

const Movie = sequelize.define(
    "Movie",
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
        runtime: DataTypes.INTEGER,
        trailer_link: DataTypes.STRING,
        description: DataTypes.STRING,
        poster: DataTypes.STRING,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE
    },
    {
        sequelize,
        modelName: 'Movie',
        tableName: 'movies',
        createdAt: 'date_created',
        updatedAt: 'date_updated',
        underscore: true,
    }
);

/**
 * Export the model, so that it can be used in any
 * page to execute CRUD operations on the app_posts table.
 */
module.exports = Movie;