'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        'todos', // name of Target model
        'isChecked', // name of the key we're adding
        {
          type: Sequelize.BOOLEAN,
          // setting foreign key relationship
          // setting when primary key is updated or deleted
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      )
      .then(() =>
        queryInterface.addColumn(
          'achievments', // name of Target model
          'rate', // name of the key we're adding
          {
            type: Sequelize.INTEGER,

            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }
        )
      );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('todos', 'isChecked');
    await queryInterface.removeColumn('achievments', 'rate');
  }
};
