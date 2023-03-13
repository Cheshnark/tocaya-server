const express = require('express');
const multer = require('multer');

const upload = multer({ dest: './images' });

const {
    getProfile,
    updateProfile,
    uploadImage
} = require('../controllers/profileController');

const router = express.Router();

//GET profile
router.get('/', getProfile);

//UPDATE profile
router.patch('/', upload.single('profilePicture'), updateProfile);

//POST upload image
router.post('/upload', upload.single('profilePicture'), uploadImage);

module.exports = router;