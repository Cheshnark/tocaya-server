const express = require('express');
const multer = require('multer');
const requireAuth = require('../middleware/requireAuth');

const upload = multer({ dest: './images/shop' });

const {
    getProducts,
    postProduct,
    updateProduct,
    deleteProduct,
    deleteProductImage,
    deleteArrayItem
} = require('../controllers/shopController');

const router = express.Router();

//GET all products
router.get('/', getProducts);

//Require auth for all routes below
router.use(requireAuth);

//POST product
router.post('/product', postProduct);

//UPDATE product
router.patch('/product', upload.single('productPicture'), updateProduct);

//DELETE product
router.delete('/product', deleteProduct);

//DELETE product image
router.delete('/product/image', deleteProductImage);

//DELETE product array item
router.delete('/product/item', deleteArrayItem);


module.exports = router;