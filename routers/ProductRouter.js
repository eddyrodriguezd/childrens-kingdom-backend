const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const ProductController = require('../controllers/ProductController');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');

const api = require('express').Router();

api.post("/", isAuthenticated, isAdmin, upload.single('image'), ProductController.createProduct);
api.get("/category/:category", ProductController.getAllActiveProductsByCategory);
//api.get("/:id", isAuthenticated, getOne);
//api.post("/:id", isAuthenticated, addItem);
//api.delete("/:id", isAuthenticated, deleteList);

module.exports = api;