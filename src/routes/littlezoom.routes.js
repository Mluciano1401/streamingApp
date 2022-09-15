const { Router } = require('express');
const router = Router();

const middlewares = require('../middlewares/tokenmiddlewares');

router.get('/', (req, res) => {
    res.redirect('index.html');
})


module.exports = router;