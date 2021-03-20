const { user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  // GET /accesstokenrequest
  // headers['authorization'] 에 담긴 토큰이 서버에서 생성한 토큰인지 검증

  const accessTokenData = isAuthorized(req);
  if (!accessTokenData) {
    return res.json({ message: 'invalid access token' });
  }

  // 인증된 토큰에서 가져온 id
  const { id } = accessTokenData;
  user
    .findOne({
      where: { id },
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: 'access token has been tempered',
        });
      }
      delete result.dataValues.password;
      return res.json({
        data: { userInfo: result.dataValues },
        message: 'ok',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: 'not found' });
    });
};
