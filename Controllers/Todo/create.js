const { user } = require('../../models');
const { todo } = require('../../models');

module.exports = async (req, res) => {
    const { id, content, uesr_id, order } = req.body;
    todo
        .findOrCreate({
            where: {
                user_id: user_id
            },
            defaults: {
                content: content,
                order: order,
                isChecked: false
            },
        })
        .then(([result, created]) => {
            if (!created) {
                res.send(`이미 존재하는 콘텐츠 입니다.`);
            } else {
                res.status(201).json({
                    data: result.dataValues,
                    message: `작성 완료`,
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'server error' + err });
        });
};


// 지금 수정인지 그냥 생성인지 그런게 헷갈리고 findorcreate공부가 부족하다 무슨 값으로 테이블을 찾을지 고민중