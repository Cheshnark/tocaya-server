const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Array Schemas
const colorSchema = new Schema({
    name: String,
    hex: String
})


//Schemas 
const productSchema = new Schema({
    productTitle:{
        type: String,
        required: true
    },
    productInnerTitle:{
        type: String
    },
    productDescription: {
        type: String
    },
    productInnerDescription: {
        type: String
    },
    images: [{
        fieldname: String,
        originalname: String,
        encoding: String,
        mimetype: String,
        destination: String,
        filename: String,
        path: String,
        size: Number
    }],
    size: [{
        type: String
    }],
    backgroundColor: [{
        name: {
            type: String,
            unique: true
        },
        hex: String
    }]
 
});

module.exports = new mongoose.model('Product', productSchema);