const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

//Array schemas
const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    }
}, {timestamps: true});

//Static signup method
adminSchema.statics.signup = async function(email, password) {
    //Validation
    if(!email || !password) {
        throw Error('Han de rellenarse todos los campos');
    };
    if(!validator.isEmail(email)) {
        throw Error('El email no es válido');
    };
    if(!validator.isStrongPassword(password)) { 
        throw Error('La contraseña es demasiado débil');
    };

    const exists = await this.findOne({email});

    if(exists) {
        throw Error('El email ya está en uso');
    };

    //Create strong password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const admin = await this.create({email, password: hash});

    return admin
}

// Static login method
adminSchema.statics.login = async function (email, password) {

    if(!email || !password) {
        throw Error('Deben rellenarse todos los campos');
    };

    const admin = await this.findOne({email});

    if(!admin) {
        throw Error('Usuario incorrecto')
    };

    const match = await bcrypt.compare(password, admin.password);

    if(!match) {
        throw Error('Contraseña incorrecta');
    };

    return admin;
}

//Static reset password method
adminSchema.statics.reset = async function(email, password) {
    //Validation
    if(!password) {
        throw Error('Han de rellenarse todos los campos');
    };
    if(!validator.isStrongPassword(password)) {
        throw Error('La contraseña es demasiado débil');
    };

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const admin = await this.updateOne({email:email}, {$set: {
        password:hash
    }});

    return admin;
}

module.exports = mongoose.model('Admin', adminSchema);