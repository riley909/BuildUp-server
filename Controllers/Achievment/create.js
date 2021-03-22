const { achievment } = require('../../models');
const { user } = require('../../models');

module.exports = async (req, res) => {
    const { email, rate } = req.body;
    await achievment                      // 여기 achievment => user
        .findOrCreate({
            where: {
                user_id: user_id    // findOrCreate도 where 문에 여러개 작성가능한가?
            },
            defaults: {
                rate: rate,
            },
        })
        .then(([result, created]) => {
            if (!created) {
                res.send(`이미 존재하는 이메일 입니다.`);  // 아마 이미 존재하면 수정하는 함수를 쓰면 될듯 
            } else {
                res.status(201).json({
                    data: result.dataValues,
                    message: `회원가입 완료`,
                });
            }
        })


};

//여기서 헷갈리는겍 달성율은 계속 만들어지는게 아니라 처음에 한 번 만들어지고 그후에는 계속 
// 수정되는건데 이걸 어떻게 할지 그걸 정해야 한다 


// 내가 계속 궁금한건 이미 로그인한 애들의 데이터베이스를 조회할때 그아이들의 아이디가 필요한지 
// 아니면 그냥 접근하면 되는지 그게 궁금하다 


// 내생각으로는 토큰에서 모든 실패 status처리를 하기 때문에 여기는 필요없을듯


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



// .then(result => {
//     if (!result) {
//         res.status(401).json({ data: null, message: '존재하지 않는 유저입니다.' })
//     } else {
//         console.log(result.dataValues);
//         achievment.update(
//             { rate: rate },
//             { where: { id: result.dateValues.id } }
//         )
//             .then(seResult => {
//                 res.status(200).json({
//                     data: {
//                         id: seResult.data.dateValues.id,
//                         rate: seResult.data.dateValues.achievment
//                     },
//                     message: "successfully created"
//                 })
//             }).catch(err => console.log(err))
//     }
// })
