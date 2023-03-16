const Profile = require('../models/profileModel');
const mongoose = require('mongoose');

//GET profile
const getProfile = async (req, res) => {
    const profile = await Profile.find({});
    res.status(200).json(profile);
}

//UPDATE profile
const updateProfile = async (req, res) => {
    try {
        const { body, file } = req;
        const {id, name, description} = body;
        const profilePicture = file;
        let bodyObject = {};
        
        if(name.length < 1 && description.length < 1) {
            bodyObject = {
                id:id,
                profilePicture: profilePicture
            };
        }else if(name.length < 1 && !profilePicture) {
            bodyObject = {
                id:id,
                description:description
            };
        }else if(description.length < 1 && !profilePicture){
            bodyObject = {
                id:id,
                name:name
            };
        }else if(!profilePicture) {
            bodyObject = {
                id:id,
                name:name,
                description:description
            };
        }else{
            bodyObject = {
                id:id,
                name:name,
                description:description,
                profilePicture:profilePicture
            };
        }
    
        const profile = await Profile.findOneAndUpdate({_id:id}, {$set: bodyObject}, {new: true});
        console.log(profile);
        res.status(200).json(profile);
      } catch (error) {
          return res.status(404).json({error:error.message});
      }
}

//POST upload image
//Si todo va bien este método va fuera una vez apañe el resto de cosas
const uploadImage = async (req, res) => {
    try {
    const { body, file } = req;
    const {name, description} = body;
    const profilePicture = file;

    const profile = await Profile.create({name, description, profilePicture});
    res.status(200).json(profile);
  } catch (error) {
      return res.status(404).json({error:error.message});
  }
};

module.exports = {
    getProfile,
    updateProfile,
    uploadImage
}