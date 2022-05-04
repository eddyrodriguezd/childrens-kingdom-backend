//Configuration
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({
    path: '.env',
});
const cloudinary = require("cloudinary").v2;
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
app.use(express.json());

//Routers
app.use('/api/products', require('./routers/ProductRouter'));
app.use('/api/auth', require('./routers/UserRouter'));

//Run
app.listen(process.env.PORT || 8000, () => {
    mongoose.connect(process.env.DB_CONNECTION_STRING_URI)
        .then(() => console.log(`Successfully connected to DB <{${process.env.DB_CONNECTION_STRING_URI}}>`))
        .catch(err => console.log(`Couldn't connect to DB <{${process.env.DB_CONNECTION_STRING_URI}}>. Error: ${err}`));
});

module.exports = app;
