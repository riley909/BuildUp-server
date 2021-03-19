// TODO: require user Model

module.exports = async (req, res) => {
  const userInfo = await Users.findOne({
    where: { userId: req.body.Id },
  }).catch(() => res.status(500).json({ data: null, message: 'server error' }));

  if (!userInfo) {
    res.status(401).json({ data: null, message: 'not authorized' });
  } else {
    res.cookie('refreshToken', '').json({ message: '로그아웃 완료' });
  }
};
