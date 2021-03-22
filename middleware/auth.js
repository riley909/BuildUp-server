require('dotenv');
const { isAuthorized } = require('../Controllers/tokenFunctions');

module.exports = (req, res, next) => {
  try {
    const accessTokenData = isAuthorized(req);
    if (accessTokenData) {
      res.locals.userId = accessTokenData.id;
      next();
    } else {
      res.status(401).json({ message: 'unauthorized' });
    }
  } catch (err) {
    res.status(401).json({ message: 'token expired' });
  }
};
