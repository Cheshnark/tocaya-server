const Admin = require('../models/adminModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "TocayaVazquez@gmail.com",
        pass: `${process.env.GMAIL_PASSWORD}`
    },
    tls: {
        rejectUnauthorized: false
    }
});

//Token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn:'1d'});
};

//Create new admin
const createAdmin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const admin = await Admin.signup(email, password);
        const token = createToken(admin._id);
        res.status(200).json({email, token})
    }catch(error) {
        res.status(400).json({error:error.message})
    }
};

//Adming login
const loginAdmin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const admin = await Admin.login(email, password);
        const token = createToken(admin._id);
        res.status(200).json({email, token});
    }catch(error) {
        res.status(400).json({error:error.message})
    }
}

//DELETE admin
const deleteAdmin = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Admin does not exist'});
    };

    const admin = await Admin.findOneAndDelete({_id: id});

    if(!admin) {
        return res.status(404).json({error: 'Admin does not exist'});
    };

    res.status(200).json(admin);
}

//POST forgot password
const postPassword = async (req, res) => {
    const { email } = await req.body;
    const admin = await Admin.findOne({email:email});
    

    if(!admin) {
        return res.status(404).json({error:'Email does not exist'})
    };

    const payload = {
        email: admin.email,
        id: admin._id
    }
    const token = jwt.sign(payload, process.env.SECRET, {expiresIn:'15m'});
    const link = `http://localhost:8000/user/forgot-password/${admin._id}/${token}`;
    
    let mailOptions = {
        from: "rocaseca.app@gmail.com",
        to: `${email}`,
        subject: "Recupera tu contraseña",
        text: `¡Hola ser de la roca! \n\n¿Has olvidado tu contraseña? No pasa nada, tan solo tienes que pulsar en el siguiente enlace para recuperarla, pero recuerda que solo estará activo durante 15 minutos: \n\n ${link}`
    };
    
    transporter.sendMail(mailOptions, (err, success) => {
        if(err){
            console.log(err);
        }else {
            console.log('Email send successfully');
        }
    })

    res.json({Message:'Se ha enviado un email a tu correo con los pasos para resetear la contraseña.'})

}

//GET forgot password
const getPassword = async (req, res) => {
    const { id, token } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Admin does not exist'})
    };

    try {
        const payload = jwt.verify(token, process.env.SECRET)
        const admin = await Admin.findById(id);

        if(payload.id === id){
            res.render("index", {admin: admin})
        }

    } catch (error) {
        console.log(error);
        res.status(404).json(error.message);
    }

}

//POST reset password
const postResetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    
    const oldAdmin = await Admin.findById(id);
    if(!oldAdmin) {
        return res.json({status:"El usuario no existe"})
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET)
        
        const admin = await Admin.reset(payload.email, password);

        res.render("success", { email: payload.email, status: "verified", admin:admin });

    } catch (error) {
        console.log(error);
        res.status(404).json(error.message);
    }

}

module.exports = {
    createAdmin,
    loginAdmin,
    deleteAdmin,
    postPassword,
    getPassword,
    postResetPassword
}