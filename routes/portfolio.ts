const express = require('express');

const { 
    getAllPortfolio,
    getOnePortfolio,
    postOneImage,
    deleteOneImage
 } = require('../controllers/portfolioController');

const router = express.Router();

//GET all portfolio images
router.get('/', getAllPortfolio);

//GET one image
router.get('/:id', getOnePortfolio);

//POST one image
router.post('/post', postOneImage);

//DELETE one image
router.delete('/delete', deleteOneImage);

//De las dos de abajo, probablemente me tenga que quedar
//solo con una. Pero de quitar la de abajo, peta TS

module.exports =router;

export{ router }