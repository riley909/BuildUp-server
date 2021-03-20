const { user } = require('../../models');
const {
  checkRefreshToken,
  generateAccessToken,
  resendAccessToken,
} = require('../tokenFunctions');

module.exports = (req, res) => {
  // GET /refreshtokenrequest
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.json({ message: 'refresh token not provided' });
  }

  // 요청에 담긴 refresh token이 유효하지 않을 경우
  const refreshTokenData = checkRefreshToken(refreshToken);
  if (!refreshTokenData) {
    return res.json({ message: 'invalid refresh token' });
  }
  // 유효한 경우
  // 새로운 access token 발급
  const { id } = refreshTokenData;
  user
    .findOne({
      where: { id: id },
    })
    .then((result) => {
      if (!result) {
        return res.json({ message: 'refresh token has been tempered' });
      }
      delete result.dataValues.password;
      const newAccessToken = generateAccessToken(result.dataValues);
      resendAccessToken(res, newAccessToken, result.dataValues);
    })
    .catch((err) => {
      console.log(err);
    });
};
