const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Array Schemas

const colorSchema = new Schema({
    name: String,
    hex: String
})


//Schemas 
const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description: {
        type: String
    },
    img: [{
        data: Buffer,
        contentType: String
    }],
    size: [{
        type: String
    }],
    backgroundColor: [{
        colorSchema
    }]

    // Meter campo de fecha de entrega? Cómo va? EH? EH?
 
});

module.exports = new mongoose.model('Product', productSchema);