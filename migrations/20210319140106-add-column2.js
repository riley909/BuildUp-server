'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        'achievments', // name of Target model
        'date_id', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          // setting foreign key relationship
          references: {
            model: 'dates', // name of Source model
            key: 'id',
          },
          // setting when primary key is updated or deleted
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      )
      .then(() =>
        queryInterface.addColumn(
          'achievments', // name of Target model
          'user_id', // name of the key we're adding
          {
            type: Sequelize.INTEGER,

            references: {
              model: 'users', // name of Source model
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }
        )
      );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('achievments', 'user_id');
    await queryInterface.removeColumn('achievments', 'date_id');
  }
};
