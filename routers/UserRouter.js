const { register, login } = require('../controllers/UserController');

const api = require('express').Router();

api.post("/register", register);
api.post("/login", login);

module.exports = api;