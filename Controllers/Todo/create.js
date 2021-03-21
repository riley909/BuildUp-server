const { todo } = require('../../models');

module.exports = async (req, res) => {
  await todo.create({});
};
