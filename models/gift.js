const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Gift = sequelize.define('gift', {
    id: {
       type: Sequelize.INTEGER,
       autoIncrement : true,
       allowNull : false,
       primaryKey: true,
   },
    name: Sequelize.STRING,
    details: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    quantity : {
    type: Sequelize.STRING,
    allowNull: false,
    },
});

module.exports = Gift;

