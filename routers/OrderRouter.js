const OrderController = require('../controllers/OrderController');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');

const api = require('express').Router();

api.post("/", /*isAuthenticated,*/ OrderController.createOrder);

module.exports = api;