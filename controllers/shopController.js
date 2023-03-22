const Shop = require('../models/shopModel');
const mongoose = require('mongoose');
const { unlink } = require('node:fs/promises');

//GET all products
const getProducts = async (req, res) => {
    const products = await Shop.find({});
    res.status(200).json(products);
}

//POST a product
const postProduct = async (req, res) => {
    const {productTitle} = req.body;

    try {
        const product = await Shop.create({productTitle});
        res.status(200).json(product);
    }catch(error) {
        return res.status(404).json({error:error.message});
    };
}

//UPDATE a product
const updateProduct = async (req, res) => {
    const { body, file } = req;
    const id = body._id;
    let updates = body;
    const productPicture = file;
    const size = body.size;
    const backgroundColor = body.backgroundColor;

    try {
        if(file) {
            const product = await Shop.findOne({_id:id});
            let imagesArray = product.images;
            imagesArray.push(productPicture);
            updates.images = imagesArray;
        }

        if(size) {
            const product = await Shop.findOne({_id:id});
            let sizeArray = product.size;
            sizeArray.push(size);
            sizeArray.sort((a, b) => {
                return a.split("x")[0] - b.split("x")[0];
              })
            updates.size = sizeArray;
            
        }
        
        if(backgroundColor) {
            const product = await Shop.findOne({_id:id});
            let backgroundArray = product.backgroundColor;
            backgroundArray.push(backgroundColor);
            updates.backgroundColor = backgroundArray;
        }
        
        const picture = await Shop.findOneAndUpdate({_id:id}, {$set: updates}, {new: true});
        res.status(200).json(picture);

        } catch (error) {
            return res.status(404).json({error:error.message});
        }
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

//DELETE image
const deleteProductImage = async (req, res) => {
    try {
        const {id, filename} = req.body;

        const section = await Shop.findOne({_id:id});
        const filteredSection = await section.images.filter((image) => {
            return image.filename !== filename});
    
        const picture = await Shop.findOneAndUpdate({_id:id}, {$set: {images:filteredSection}}, {new: true});
        
        if(picture) {
            await unlink(`./images/shop/${filename}`, (err) => {
                if (err) throw err;
                console.log('Image successfully deleted');
                });
        }
        
        res.status(200).json(picture);
      } catch (error) {
          return res.status(404).json({error:error.message});
      }
}

//DELETE array item
const deleteArrayItem = async (req, res) => {
    try {
        const {id, name, sectionName} = req.body;

        const section = await Shop.findOne({_id:id});

        if(sectionName === "size"){
            const filteredSection = await section.size.filter((item) => {
                return item !== name});
            
            const picture = await Shop.findOneAndUpdate({_id:id}, {$set: {size:filteredSection}}, {new: true});
            res.status(200).json(picture);
        } else {
            const filteredSection = await section.backgroundColor.filter((item) => {
                return item.name !== name});
            
            const picture = await Shop.findOneAndUpdate({_id:id}, {$set: {backgroundColor:filteredSection}}, {new: true});
            res.status(200).json(picture);
        }

      } catch (error) {
          return res.status(404).json({error:error.message});
      }
}

module.exports = {
    getProducts,
    postProduct,
    updateProduct,
    deleteProduct,
    deleteProductImage,
    deleteArrayItem
}
