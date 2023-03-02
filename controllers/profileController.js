const Profile = require('../models/profileModel');
const mongoose = require('mongoose');

//GET profile
const getProfile = async (req, res) => {
    const profile = await Profile.find({});
    res.status.json(profile);
}

//UPDATE profile
const updateProfile = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Profile does not exist'});
    };

    const profile = await Profile.findOneAndUpdate(
        {_id:id},
        {...req.body}
    )

    if(!product){
        res.status(404).json({error:'Profile does not exist'});
    };

    return res.status(200).json(product);
}

module.exports = {
    getProfile,
    updateProfile
}