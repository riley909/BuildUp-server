'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        'photos', // name of Target model
        'weather_id', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          // setting foreign key relationship
          references: {
            model: 'weather', // name of Source model
            key: 'id',
          },
          // setting when primary key is updated or deleted
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      )

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
