const express = require('express');

const {
    getProfile,
    updateProfile
} = require('../controllers/profileController');

const router = express.Router();

//GET profile
router.get('/', getProfile);

//UPDATE profile
router.patch('/', updateProfile);