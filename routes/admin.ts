const express = require('express');

const {
    getUserInfo
} = require('../controllers/adminController');

const router = express.Router();

const requireAuth = require('../middleware/requireAuth');

//Require auth for all routes
router.use(requireAuth);

//GET admin info
router.get('/user-info', getUserInfo);


//De las dos de abajo, probablemente me tenga que quedar
//solo con una. Pero de quitar la de abajo, peta TS
module.exports = router;

export{ router }