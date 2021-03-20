module.exports = {
  user: {
    login: require('./User/login'),
    accessTokenRequest: require('./User/accessTokenRequest'),
    refreshTokenRequest: require('./User/refreshTokenRequest'),
  },
  photo: {
    photo: require('./Photo/photo'),
  },
  todo: {
    todoCreate: require('./Todo/create'),
    todoInfo: require('./Todo/info'),
    todoRemove: require('./Todo/remove'),
    todoUpdate: require('./Todo/update'),
  },
};
