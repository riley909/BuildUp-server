const { user } = require('../../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.send(`회원 정보를 입력해 주세요`);
    }
    // 패스워드 DB에 저장 전 해싱하기
    const hash = await bcrypt.hash(password, saltRounds);

    user
        .findOrCreate({
            where: { email: email },
            defaults: {
                username: username,
                password: hash,
            },
        })
        .then(([result, created]) => {
            if (!created) {
                res.send(`이미 존재하는 이메일 입니다.`);
            } else {
                res.status(201).json({
                    data: result.user.dataValues,
                    message: `회원가입 완료`,
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ data: null, message: 'server error' });
        });
};
