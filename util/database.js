const Sequelize = require('sequelize');
// const mysql = require('mysql');

const sequelize = new Sequelize('gifts', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;

