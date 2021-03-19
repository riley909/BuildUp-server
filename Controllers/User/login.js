const jwt = require('jsonwebtoken');


module.exports = async (req, res) => {

    const userInfo = await Users.findOne({
        where: { email: req.body.email, password: req.body.password },
    }).catch(() => res.status(500).json({ data: null, message: "server error" }))

    if (!userInfo) {
        res.status(401).json({ data: null, message: 'not authorized' });
    } else {
        //있다면 jwt 토큰을 생성해서 access토큰은 클라이언트에 전달하고  refresh 토큰은 쿠키에 저장한다 
    }

}