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
    where: { email: email },
  });
  if (!userInfo) {
    return res.status(401).json({ message: `로그인 실패` });
  }
  const validPassword = await bcrypt.compare(password, userInfo.dataValues.password);
  if (!validPassword) {
    return res.status(400).json({ message: '회원 정보가 올바르지 않습니다.' });
  } else {
    // result에서 사용자 비밀번호 삭제
    delete userInfo.dataValues.password;
    // 토큰을 생성해서 access토큰은 클라이언트에 전달
    // refresh 토큰은 쿠키에 저장
    const accessToken = generateAccessToken(userInfo.dataValues);
    const refreshToken = generateRefreshToken(userInfo.dataValues);

    // 생성한 토큰 전달
    sendRefreshToken(res, refreshToken);
    sendAccessToken(res, accessToken);
  }
};
