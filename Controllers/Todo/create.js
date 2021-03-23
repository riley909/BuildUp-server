const { date } = require("../../models");
const { todo } = require('../../models');

module.exports = async (req, res) => {
    const { content, order, now } = req.body;

    await date.
        create({
            date: now
        }).then((result) => {
            todo
                .create({
                    user_id: res.locals.userId,
                    content: content,
                    order: order,
                    isChecked: false,
                    date_id: result.dataValues.id
                })
                .then((result) => {

                    res.status(201).json({
                        data: result.dataValues,
                        message: '작성 완료',
                    });

                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({ message: 'server error' + err });
                });
        })


};


// 지금 수정인지 그냥 생성인지 그런게 헷갈리고 findorcreate공부가 부족하다 무슨 값으로 테이블을 찾을지 고민중