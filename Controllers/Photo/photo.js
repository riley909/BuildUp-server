const { weather, photo } = require('../../models');

module.exports = async (req, res) => {
  const { code } = req.body;
  await weather.
    findOne({
      where: { code: code }
    }).then(result => {
      if (!result) {
        res.status(404).send("없는 날씨 코드입니다!");
      } else {
        photo.findOne({
          where: { weather_id: result.dataValues.id }
        }).then((result) => {
          // console.log(result);
          res.status(200).json({ image: result.dataValues.image })
        })
      }
    })


};
