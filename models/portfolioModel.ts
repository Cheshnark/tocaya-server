const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    img: {
        data: Buffer,
        contentType: String
    }
})

const portfolioSchema = new Schema({
    personal: [{
        imageSchema
    }],
    editorial: [{
        imageSchema
    }],
    children: [{
        imageSchema
    }]
})

module.exports = new mongoose.model('Image', portfolioSchema);

export {}