const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../../config/database.js");

const User = sequelize.define(
    "user",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: DataTypes.STRING,
        is_admin: DataTypes.BOOLEAN,
        date_created: DataTypes.DATE,
        date_updated: DataTypes.DATE
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        createdAt: 'date_created',
        updatedAt: 'date_updated',
        underscore: true,
    }
);

/**
 * Export the model, so that it can be used in any
 * page to execute CRUD operations on the app_posts table.
 */
module.exports = User;