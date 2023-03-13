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
    name: String,
    images: [{
        imageSchema
    }]
})

module.exports = new mongoose.model('Portfolio', portfolioSchema);

