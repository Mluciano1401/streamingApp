const router = require('express').Router();
const { check } = require('express-validator');

const userController = require('../controller/auth.controller');

router.post('/register', [
    check('username','Username is required').not().isEmpty(),
    check('email','Email is required').isEmail(),
    check('password','Password is required').not().isEmpty(),
], userController.register)
router.post('/login', userController.login);
router.get('/', (req,res)=>{
    res.redirect('login.html');
})
router.get('/register', (req,res)=>{
    res.redirect('register.html');
})
module.exports = router; 