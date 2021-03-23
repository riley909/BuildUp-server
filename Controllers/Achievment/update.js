const { achievment } = require('../../models');
const { date } = require("../../models");


module.exports = async (req, res) => {
    const { date_id, id, rate } = req.body
    await date.
        findOne({
            where: { id: date_id }
        })
        .then(result => {
            achievment.update(
                { rate: rate },
                {
                    where: {
                        id: id,
                        date_id: result.dataValues.id,
                        user_id: res.locals.userId
                    }
                }
            ).then(() => {
                res.status(200).json({
                    message: "수정완료!"
                })
            }).catch(err => console.log(err, 'dfsf'))

        })

}