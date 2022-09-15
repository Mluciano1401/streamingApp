const jwt = require('jwt-simple');
const moment = require('moment');

const checkToken = (req, res, next) => {
    if(!req.headers['user-token']){
        return res.json({
            error: 'you need to include the user-token in the header'
        })
    }

    const userToken = req.headers['user-token'];
    let payload = {};

    try{
        payload = jwt.decode(userToken, 'secret key');
    }
    catch(err){
        return res.json({
            error: 'Token is incorrect'
        })
    }

    if(payload.expiredAt < moment().unix()){
        return res.json({
            error: 'Token has expired'
        })
    }

    req.userId = payload.userId;

    next();
}

module.exports = {
    checkToken: checkToken
}