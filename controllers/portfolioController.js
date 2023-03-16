const Portfolio = require('../models/portfolioModel');
const mongoose = require('mongoose');

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
//Ver como de necesario es esto, si cada elemento dentro de la base de datos tiene una id única, podría en principio
// eliminar tanto secciones como imágenes con eso. Para ello tendría que crear una id a cada imagen con new Date o
// un método similar.

//UPDATE section
const updateSection = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Section does not exist'});
    };

    const section = await Portfolio.findOneAndUpdate(
        {_id:id},
        {...req.body}
    );

    if(!section) {
        return res.status(404).json({error:'Section does not exist'})
    }

    res.status(200).json(section);
}

module.exports = {
    getPorfolio,
    createSection,
    createImage,
    deleteSection,
    updateSection,
    
}