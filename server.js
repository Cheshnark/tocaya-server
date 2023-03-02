const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

//Mongoose configuration
mongoose.set('strictQuery', true);

//Import routes
const adminRoutes = require('./routes/admin');
const portfolioRoutes = require('./routes/portfolio');
const profileRoutes = require('./routes/profile');
const shopRoutes = require('./routes/shop');

//Express app
const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));

//Esto de aquí abajo, ¿qué coño hace?
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//Mongoose connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    let port = process.env.PORT;
    if(port == null || port == "") {
        port = 8000
    };

    app.listen(port, () => {
        console.log(`Connected to the database & server running on port ${port}`);
    })
})
.catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
});

//Routes
app.use('/admin', adminRoutes);
app.use('/portfolio', portfolioRoutes);
app.use('/profile', profileRoutes);
app.use('/shop', shopRoutes);