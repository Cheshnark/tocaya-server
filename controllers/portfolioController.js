const Portfolio = require('../models/portfolioModel');
const mongoose = require('mongoose');
const { unlink } = require('node:fs/promises');

//GET portfolio
const getPorfolio = async (req, res) => {
    const portfolio = await Portfolio.find({});
    res.status(200).json(portfolio);
};

//POST new section
const createSection = async (req, res) => {
    const name = req.body.name;
    console.log(name);
    const images = [];

    try {
        const section = await Portfolio.create({name, images});
        console.log(section);
        res.status(200).json(section);
    }catch(error) {
        res.status(400).json({error:error.message});
    }
}

//PATCH new image
const createImage = async (req, res) => {
    try {
        const id = req.body;
        const portfolioImage = req.file;
        
        const section = await Portfolio.findOne({_id:id});
        let imagesArray = section.images;
        imagesArray.push(portfolioImage);
        console.log(imagesArray);
    
        const picture = await Portfolio.findOneAndUpdate({_id:id}, {$set: {images:imagesArray}}, {new: true});
        console.log(picture);
        res.status(200).json(picture);
      } catch (error) {
          return res.status(404).json({error:error.message});
      }
}

//DELETE section
const deleteSection = async (req, res) => {
    const {id} = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Section does not exist'});
    };
     
    const section = await Portfolio.findOneAndDelete({_id:id});

    if(!section) {
        return res.status(404).json({error:'Section does not exist'});
    };

    res.status(200).json(section);
};

//DELETE image
const deleteImage = async (req, res) => {
    try {
        const {id, filename} = req.body;

        const section = await Portfolio.findOne({_id:id});
        const filteredSection = await section.images.filter((image) => {
            return image.filename !== filename});
    
        const picture = await Portfolio.findOneAndUpdate({_id:id}, {$set: {images:filteredSection}}, {new: true});
        
        if(picture) {
            await unlink(`./images/${filename}`, (err) => {
                if (err) throw err;
                console.log('successfully deleted /tmp/hello');
                });
        }
        
        res.status(200).json(picture);
      } catch (error) {
          return res.status(404).json({error:error.message});
      }
}


//UPDATE section
const updateSection = async (req, res) => {
    try {
        const {name, id} = req.body;
    
        const picture = await Portfolio.findOneAndUpdate({_id:id}, {$set: {name:name}}, {new: true});
        console.log(picture);
        res.status(200).json(picture);
      } catch (error) {
          return res.status(404).json({error:error.message});
      }
}

module.exports = {
    getPorfolio,
    createSection,
    createImage,
    deleteSection,
    deleteImage,
    updateSection,
    
}