const { todo } = require('../../models');

module.exports = async (req, res) => {
    const { user_id, id } = req.body;
    await todo
        .destroy({
            where: {
                id: id,
                user_id: user_id
            }
        })
        .then(() => {
            res.status(200).json({
                data: null,
                message: "successfully removed"
            })
        })

};