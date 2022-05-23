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
const cors = require('cors');
const corsOptions = {
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: [
        'http://localhost:3000',
        'http://ck-front.s3-website.us-east-2.amazonaws.com'
    ],
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

//Routers
app.use('/api/orders', require('./routers/OrderRouter'));
app.use('/api/products', require('./routers/ProductRouter'));
app.use('/api/colors', require('./routers/ColorRouter'));
app.use('/api/auth', require('./routers/UserRouter'));

//Run
app.listen(process.env.PORT || 49160, () => {
    mongoose.connect(process.env.DB_CONNECTION_STRING_URI)
        .then(() => console.log(`Successfully connected to DB <{${process.env.DB_CONNECTION_STRING_URI.split('@')[1]}}>`))
        .catch(err => console.log(`Couldn't connect to DB <{${process.env.DB_CONNECTION_STRING_URI.split('@')[1]}}>. Error: ${err}`));
});

module.exports = app;
