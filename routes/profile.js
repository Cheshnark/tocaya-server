const express = require('express');
const multer = require('multer');
const requireAuth = require('../middleware/requireAuth');

const upload = multer({ dest: './images' });

const {
    getProfile,
    updateProfile,
    uploadImage
} = require('../controllers/profileController');

const router = express.Router();

//GET profile
router.get('/', getProfile);

//Require auth for all routes below
router.use(requireAuth);

//UPDATE profile
router.patch('/', upload.single('profilePicture'), updateProfile);

//POST upload image
router.post('/upload', upload.single('profilePicture'), uploadImage);

module.exports = router;