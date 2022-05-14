const ColorController = require('../controllers/ColorController');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');

const api = require('express').Router();

api.get("/", isAuthenticated, isAdmin, ColorController.getAllColors);

module.exports = api;