const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const ProductController = require('../controllers/ProductController');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');

const api = require('express').Router();

api.post("/", /*isAuthenticated, isAdmin,*/ upload.single('image'), ProductController.createProduct);
api.get("/", ProductController.getAllProducts);
api.get("/category/:category", ProductController.getAllActiveProductsByCategory);
api.put("/:id", isAuthenticated, isAdmin, ProductController.updateProductInfo);

module.exports = api;