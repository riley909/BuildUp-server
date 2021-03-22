const { achievment } = require('../../models');

module.exports = async (req, res) => {
    const { user_id } = req.body;
    await achievment
        .findOne({
            where: { user_id: user_id }
        })
        .then(result => {
            if (!result) {
                res.status(401).json({ data: null, message: '존재하지 않는 유저입니다.' })
            } else {
                res.status(200).json({ achievment: result.data.dataValues })
            }
        })

};
