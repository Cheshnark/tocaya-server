const express = require('express');

const {
    getProducts,
    getProduct,
    postProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/shopController');

const router = express.Router();

//GET all products
router.get('/', getProducts);

//GET one product
router.get('/product', getProduct);

//POST product
router.post('/product', postProduct);

//UPDATE product
router.patch('/product', updateProduct);

//DELETE product
router.delete('/product', deleteProduct);


module.exports = router;