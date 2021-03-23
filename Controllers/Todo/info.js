const { todo } = require('../../models');

module.exports = async (req, res) => {
    const { user_id, id } = req.body;
    await todo
        .findAll({
            where: {
                user_id: res.locals.userId
            }
        })
        .then((result) => {
            res.status(200).json({
                data: result,
                message: "good"
            })
        })

};