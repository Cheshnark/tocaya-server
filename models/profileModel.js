const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Schemas

const profileSchema = ({
    name: String,
    description: String,
    profilePicture: {
        fieldname: String,
        originalname: String,
        encoding: String,
        mimetype: String,
        destination: String,
        filename: String,
        path: String,
        size: Number
      },
      oldFileName: String
      
    
});

module.exports = new mongoose.model('Profile', profileSchema);