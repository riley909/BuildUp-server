require('dotenv');
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    // accessToken 생성
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '15s' });
  },
  generateRefreshToken: (data) => {
    // refreshToken 생성
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: '30d' });
  },
  sendRefreshToken: (res, refreshToken) => {
    // refreshToken 전송
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
  },
  sendAccessToken: (res, AccessToken) => {
    // accessToken 전송
    res.json({
      data: { accessToken: AccessToken },
      message: 'ok',
    });
  },
  resendAccessToken: (res, accessToken, data) => {
    // accessToken 재발급
    res.json({
      data: { accessToken: accessToken, userinfo: data },
      message: 'ok',
    });
  },
  isAuthorized: (req) => {
    // 인증 확인
    // accessToken 검증
    const authorization = req.headers['authorization'];
    if (!authorization) {
      return null;
    }
    const token = authorization.split(' ')[1];
    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  checkRefreshToken: (refreshToken) => {
    // refreshToken 검증
    try {
      return verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (e) {
      console.log(e);
      return null;
    }
  },
};
