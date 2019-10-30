const Sequelize = require('sequelize');

const sequelize = new Sequelize('gifts', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;

