const express = require('express');
const multer = require('multer');
const requireAuth = require('../middleware/requireAuth');

const upload = multer({ dest: './images/portfolio' });

const { 
    getPorfolio,
    createSection,
    createImage,
    deleteSection,
    deleteImage,
    updateSection,
 } = require('../controllers/portfolioController');

const router = express.Router();

//GET portfolio
router.get('/', getPorfolio);

//Require auth for all routes below
router.use(requireAuth);

//POST add section
router.post('/section', createSection)

//POST add image
router.patch('/section/image',upload.single('portfolioImage'), createImage);

//DELETE section
router.delete('/section', deleteSection);

//DELETE image
router.delete('/section/image', deleteImage);

//UPDATE section
router.patch('/section', updateSection);

// De delete, update y post tengo que ver si puedo agregar, borrar y editar imágenes vía ID o si puedo 
// hacer un patch para modificar esa información y cómo hacerlo. 

module.exports = router;