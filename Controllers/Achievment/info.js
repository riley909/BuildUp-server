const { achievment } = require('../../models');

module.exports = async (req, res) => {
    const { email } = req.body;
    await achievment
        .findOne({
            where: { email: email }
        })
        .then(result => {
            if (!result) {
                res.status(401).json({ data: null, message: '존재하지 않는 유저입니다.' })
            } else {
                res.status(200).json({ achievment: result.data.dataValues })
            }
        })

};