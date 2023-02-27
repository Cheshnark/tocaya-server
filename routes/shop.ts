const express = require('express');

const {
    getProducts,
    getProduct
} = require('../controllers/shopController');

const router = express.Router();

//GET all products
router.get('/products', getProducts);

//GET one product
router.get('/product', getProduct);


//Aquí he dejado uno sólo por probar
export { router }