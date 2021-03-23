const { todo } = require('../../models');
const { user } = require('../../models');

module.exports = async (req, res) => {
    const { content, id, order, isChecked, date_id } = req.body;

    await todo
        .update(
            {
                content: content,
                order: order,
                isChecked: isChecked,
                date_id: date_id
            },
            {
                where: {
                    id: id,
                    user_id: res.locals.userId
                }
            }
        ).then(() => {
            res.status(200).json({
                message: "successfully"
            })
        }).catch(err => console.log(err))

};


// 업데이트 할때 체크상태랑 순서도 계속 바꿔줘야 할 듯 