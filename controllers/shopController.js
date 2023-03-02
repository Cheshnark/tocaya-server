const Shop = require('../models/shopModel');
const mongoose = require('mongoose');

//GET all products
const getProducts = async (req, res) => {
    const products = await Shop.find({});
    res.status(200).json(products);
}

//GET one product
const getProduct = async  (req, res) => {
    const {id} = req.params;

    if(!mongoose.Type.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Product does not exist'});
    };

    const product = await Shop.findById(id);

    if(!product){
        return res.status(404).json({error: 'Product does not exist'});
    };

    res.status(200).json(product);
}

//POST a product
const postProduct = async (req, res) => {
    const {name, description, img, size, backgroundColor } = req.body;

    try {
        const product = await Shop.create({name, description, img, size, backgroundColor});
        res.status(200).json(product);
    }catch(error) {
        return res.status(404).json({error:error.message});
    };
}

//UPDATE a product
const updateProduct = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Product does not exist'});
    };

    const product = await Shop.findOneAndUpdate(
        {_id:id},
        {...req.body}
    )

    if(!product) {
        res.status(404).json({error:'Product does not exist'})
    }

    return res.status(200).json(product);
};

//DELETE a product
const deleteProduct = async (req, res) => {
    const{id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({error: 'Product does not exist'});
    };

    const product = await Shop.findOneAndDelete({_id:id});

    if(!product) {
        res.status(404).json({error: 'Product does not exist'});
    };

    return res.status(200).json(product);
}

module.exports = {
    getProducts,
    getProduct,
    postProduct,
    updateProduct,
    deleteProduct
}
