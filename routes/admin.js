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

//POST create admin 
router.post('/create', createAdmin);

//POST login
router.post('/login', loginAdmin);

//DELETE admin
router.delete('/delete', deleteAdmin);

//POST forgot password
router.post('/forgot-password', postPassword);

//GET forgot password
router.get('/forgot-password', getPassword);

//POST reset password
router.post('/reset-password', postResetPassword);

module.exports = router;