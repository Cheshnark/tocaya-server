const express = require('express');

const {
    createAdmin,
    loginAdmin,
    deleteAdmin,
    postPassword,
    getPassword,
    postResetPassword
} = require('../controllers/adminController');

const router = express.Router();

const requireAuth = require('../middleware/requireAuth');

//Require auth for all routes
router.use(requireAuth);

//POST create admin -- Ver como hacer que solo pueda crear una persona los admins, quizá con un token. 
router.post('/create', createAdmin);

//GET admin info
router.get('/login', loginAdmin);

//DELETE admin
router.delete('/delete', deleteAdmin);

//POST forgot password
router.post('/forgot-password', postPassword);

//GET forgot password
router.get('/forgot-password', getPassword);

//POST reset password
router.post('/reset-password', postResetPassword);


//De las dos de abajo, probablemente me tenga que quedar
//solo con una. Pero de quitar la de abajo, peta TS

module.exports = router;