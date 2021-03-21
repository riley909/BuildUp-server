const { user } = require('../../models');
const {
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require('../tokenFunctions');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  const { email, password } = req.body;
  const userInfo = await user.findOne({
    where: {
      email: email,
    },
  });

  if (!userInfo) {
    return res.status(401).json({ message: `로그인 실패` });
  }
  const validPassword = await bcrypt.compare(password, result.dataValues.password);
  if (!validPassword) {
    return res.status(400).json({ message: '회원 정보가 올바르지 않습니다.' });
  }

  // result에서 사용자 비밀번호 삭제
  delete result.dataValues.password;
  // 토큰을 생성해서 access토큰은 클라이언트에 전달
  // refresh 토큰은 쿠키에 저장
  const accessToken = generateAccessToken(result.dataValues);
  const refreshToken = generateRefreshToken(result.dataValues);

  // 생성한 토큰 전달
  sendAccessToken(res, accessToken);
  sendRefreshToken(res, refreshToken);

  // .catch((err) => {
  //   console.log(err);
  //   res.status(404).json({ message: 'not found' });
  // });
};
