const { achievment } = require('../../models');
const { date } = require("../../models")

module.exports = async (req, res) => {
    const { id, rate, date_id } = req.body;

    await date
        .findOne({
            where: { id: date_id }
        })
        .then(result => {
            achievment                      // 여기 achievment => user
                .Create({                     // 일단 머든 만들때 클라에서 날자를 보내주면 날짜 먼저 생성해야 하는듯 데이터 테이블에 
                    user_id: res.locals.userId,
                    date_id: result.dataValues.id,
                    rate: rate,
                })
                .then((result) => {
                    res.status(201).json({
                        rate: result.dataValues,
                        message: "successfully",
                    });

                })
        })



};


// todo를 create할때 체크를 할 수도 있고 그럼 date_id가 없을텐데 바로 한 번에 다해서 동시에 날라오는 
//경우는 어떻게 하지?





