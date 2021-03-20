'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      todo.belongsTo(models.user, { foreignKey: 'user_id' });
      todo.belongsTo(models.date, { foreignKey: 'date_id' });
    }
  };
  todo.init({
    content: DataTypes.STRING,
    order: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    date_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'todo',
  });
  return todo;
};