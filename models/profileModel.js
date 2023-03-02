const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Schemas

const profileSchema = ({
    name: String,
    profilePicture: {
        data: Buffer,
        contentType: String
    },
    description: String
});

module.exports = new mongoose.model('Profile', profileSchema);