const jwt = require('jsonwebtoken');
const { user } = require('../../models');

module.exports = async (req, res) => {
  const { email, password } = req.body;
  await user
    .findOne({
      where: {
        email: email,
        password: password,
      },
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({ message: `로그인 실패` });
      }
      //있다면 jwt 토큰을 생성해서 access토큰은 클라이언트에 전달하고  refresh 토큰은 쿠키에 저장한다
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: 'not found' });
    });
};
