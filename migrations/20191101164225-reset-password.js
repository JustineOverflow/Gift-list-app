'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('users', 'resetToken', {
                type: Sequelize.STRING
            }),
            queryInterface.addColumn('users', 'resetTokenExpiration', {
                type: Sequelize.DATE,
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('users', 'resetToken'),
            queryInterface.removeColumn('users', 'resetTokenExpiration')
        ])
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
    }
};
