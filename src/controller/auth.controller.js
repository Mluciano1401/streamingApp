const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const moment = require('moment');
const jwt = require('jwt-simple');

const { User } = require('../database/db');

exports.register = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            errors: errors.array()
        });
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await User.create(req.body);
    res.json(user);
}

exports.login = async (req, res) => {
    console.log("klk")
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    })
    if(user){
        const equals = bcrypt.compareSync(req.body.password, user.password);
        if(equals){
            res.json({ 
                success: createToken(user)
            });
        }
        else{
            res.json({
                error: 'The username and/or password is wrong'
            })
        }
    }
}

const createToken = (user) => {
    const payload = {
        userId: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(5, 'minutes').unix()
    }
    return jwt.encode(payload, 'secret key');
}