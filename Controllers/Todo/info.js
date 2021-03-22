const { todo } = require('../../models');

module.exports = async (req, res) => {
    const { user_id, id } = req.body;
    await todo
        .findOne({
            where: {
                user_id: user_id
            }
        })
        .then((result) => {
            res.status(200).json({
                data: result.dataValues,
                message: "good"
            })
        })

};