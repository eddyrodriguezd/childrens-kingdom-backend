//Configuration
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({
    path: '.env',
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
