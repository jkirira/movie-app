const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("movie_project_db", "homestead", "secret", {
    host: "192.168.56.56",
    dialect: "mysql"
});


module.exports = sequelize;