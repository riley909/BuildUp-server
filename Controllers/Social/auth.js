require('dotenv').config();
const { user } = require('../../models');
const {
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require('../tokenFunctions');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports.googlelogin = (req, res) => {
  const code = req.body.authorizationCode;
  client
    .verifyIdToken({ idToken: code, audience: process.env.GOOGLE_CLIENT_ID })
    .then((response) => {
      const { email_verified, name, email } = response.payload;
      if (email_verified) {
        user
          .findOne({
            where: { email: email },
          })
          .then((user) => {
            if (user) {
              // 이미 존재하는 사용자
              // 같은 소셜아이디로 로그인 기록이 있으므로 로그인하기위해 토큰을 발급한다.
              delete user.password;
              const accessToken = generateAccessToken(user);
              const refreshToken = generateRefreshToken(user);
              sendAccessToken(res, accessToken);
              sendRefreshToken(res, refreshToken);
            } else {
              // 처음 로그인하는 사용자는 회원정보를 DB에 저장한다.
              // 소셜로그인은 따로 저장할 패스워드가 없으므로 임의의 데이터를 패스워드로 지정.
              const password = email + process.env.ACCESS_SECRET;
              user
                .create({
                  username: name,
                  email: email,
                  password: password,
                })
                .then((result) => {
                  const accessToken = generateAccessToken(result);
                  const refreshToken = generateRefreshToken(result);
                  sendAccessToken(res, accessToken);
                  sendRefreshToken(res, refreshToken);
                });
            }
          });
      }
    });
};
