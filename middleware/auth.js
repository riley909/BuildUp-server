require('dotenv');
const { isAuthorized } = require('../Controllers/tokenFunctions');

module.exports = (req, res, next) => {
  try {
    const accessTokenData = isAuthorized(req);
    if (accessTokenData) {
      res.locals.userId = accessTokenData.id;
      next();
    } else {
      console.log(accessTokenData);
      res.status(401).json({ message: "unauthorized" });
    }
  } catch (err) {
    res.status(401).json({ message: "token expired" });
  }
};



//여기서 날짜를 지정해줘야 할거같다 