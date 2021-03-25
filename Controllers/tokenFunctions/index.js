require('dotenv');
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    // accessToken 생성
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '12h' }); // 테스트용으로 시간 연장
  },
  generateRefreshToken: (data) => {
    // refreshToken 생성
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: '30d' });
  },
  sendRefreshToken: (res, refreshToken) => {
    // refreshToken 전송
    res.cookie('refreshToken', refreshToken, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  },
  sendAccessToken: (res, accessToken) => {
    // accessToken 전송
    res.json({
      data: { accessToken: accessToken },
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
    console.log(authorization, 'dfsf');
    if (!authorization) {
      return null;
    }
    const token = authorization.split(' ')[1];
    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (e) {
      console.log(e, 'jeon');
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
