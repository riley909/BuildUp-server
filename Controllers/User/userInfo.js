const { user } = require('../../models');

module.exports = async (req, res) => {
  const { email } = req.body;
  await user
    .findOne({
      where: { email: email },
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({ data: null, message: '존재하지 않는 유저입니다.' });
      }
      res.status(200).json({
        data: result.data.dataValues,
        message: 'ok',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: 'not found' });
    });
};
