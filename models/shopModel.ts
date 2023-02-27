const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Array Schemas

const sizeSchema = new Schema({

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
    // backgroundColor: {
    //     type: String,
    //     required: true,
    // }

    // Respecto a lo de arriba preguntar si son unos colores predeterminados o si puede elegir cualquiera el cliente. 
});

module.exports = new mongoose.model('Product', productSchema);

export {}