const { achievment } = require('../../models');

module.exports = async (req, res) => {
    await achievment
        .findAll({
            where: { user_id: res.locals.userId } //여기에 날을 정하면 될거 같다 
        })
        .then(result => {
            res.status(200).json({ achievment: result, message: "dfsss" })
        })

};
