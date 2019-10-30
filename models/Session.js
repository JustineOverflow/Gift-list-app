const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const mappings = {
    sid: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    expires: Sequelize.DATE,
    data: Sequelize.STRING(50000),
};

const Session = sequelize.define('Session', mappings, {
    indexes: [
        {
            name: 'session',
            method: 'BTREE',
            fields: ['sid'],
        },
    ],
});

exports.getMapping = () => mappings;

exports.getModel = () => Session;