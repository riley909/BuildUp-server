const { todo } = require('../../models');
const { user } = require('../../models');

module.exports = async (req, res) => {
    const { user_id, id } = req.body;
    await todo                      // 여기 achievment => user
        .findOne({
            where: { user_id: user_id }
        })
        .then(() => {
            todo.update(
                { content: content },
                { where: { id: id } }
            )
                .then(seResult => {
                    res.status(200).json({  // 무엇을 클라에게 전달할지 고민중 
                        message: "successfully"
                    })
                }).catch(err => console.log(err))

        })

};


