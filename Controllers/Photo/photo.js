module.exports = async (req, res) => {
  const weather = await Users.findOne({
    where: { weather: req.body.weather },
  }).catch(() => res.status(500).json({ message: 'not found' }));

  res
    .status(200)
    .json({ filepath: weather, message: 'successfully get background wallpaper' });
};
