const { achievment } = require('../../models');

module.exports = async (req, res) => {
    const { email, achievment } = req.body;
    await achievment
        .findOne({
            where: { email: email }
        })
        .then(result => {
            if (!result) {
                res.status(401).json({ data: null, message: '존재하지 않는 유저입니다.' })
            } else {
                result.update({
                    rate: achievment
                })
                    .then(seResult => {
                        res.status(200).json({
                            data: {
                                id: seResult.data.dateValues.id,
                                rate: seResult.data.dateValues.achievment
                            },
                            message: "successfully created"
                        })
                    })
            }
        })

};



// 이거 일단 살짝 보류 보내줄때 이메일이랑 날짜가 언제인지를 같이 보내줘야 하는거 같다 
// 그리고 todo 생성시에도 컨텐츠만 보낼게 아니라 타이틀도 보내야 될거같고 
// 지금 토큰으로 하는데 토큰인증센터 검증하는 시스템도 만들어야 한다 
//save 찾아온 다음에 result가 존재하면 그안에서 다시 update 하면 되겠다 


// getId: function (req, res) {
//     models.url.findOne({
//         where: { id: req.params.id }
//     }).then(jae => {
//         jae.update({ title: 'jeon' }).then(seong => { res.send(console.log(seong, 'dsafasfafa')) })
//     })

// },

//이런식으로 쓰면 될듯하다 
