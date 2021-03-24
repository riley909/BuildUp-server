const { todo, date } = require('../../models');

module.exports = async (req, res) => {
    await todo
        .findAll({
            where: {
                user_id: res.locals.userId
            }
        })
        .then((result) => {
            const userId = result[0].dataValues.user_id;
            // console.log(userId);
            date
                .findAll({
                    where: {
                        user_id: userId
                    }
                }).then(resultB => {
                    // console.log(resultB.dataValues);
                    const day = resultB.map(el => {
                        return [el.date, el.id];
                    })
                    console.log(day);
                    // const { date_id, date } = resultB
                    res.status(200).json({
                        data: result,
                        day: day,
                        message: "good"
                    })
                })

        })

};