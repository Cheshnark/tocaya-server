const express = require('express');

const { 
    getPorfolio,
    createSection,
    createImage,
    deleteSection,
    updateSection,
 } = require('../controllers/portfolioController');

const router = express.Router();

//GET portfolio
router.get('/', getPorfolio);

//POST add section
router.post('section', createSection)

//POST add image
router.post('/section/image', createImage);

//DELETE section
router.delete('/section', deleteSection);

//UPDATE section
router.patch('/section', updateSection);

// De delete, update y post tengo que ver si puedo agregar, borrar y editar imágenes vía ID o si puedo 
// hacer un patch para modificar esa información y cómo hacerlo. 

module.exports = router;