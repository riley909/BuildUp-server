const { todo } = require('../../models');
const { date } = require('../../models')

module.exports = async (req, res) => {
    const { id } = req.body;

    await todo
        .destroy({
            where: {
                id: id,
                user_id: res.locals.userId
            }
        })
        .then(() => {
            date.destroy()
            res.status(200).json({
                data: null,
                message: "successfully removed"
            })
        })

};


// await date
// .destroy({ where: { id: 16 } })
// .then(res.send('good'));