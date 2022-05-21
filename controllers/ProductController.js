const ProductService = require('../services/ProductService');

const createProduct = async (req, res) => {
    try {
        const {file} = req;
        const {title, description, price, category} = req.body;
        console.log(`Product received: <${title}> from category <${category}> with image <${file.originalname}>`);

        const newProduct = await ProductService.saveProduct(file, {title, description, price, category});
        res.status(200).send({ message: 'New product created', data: newProduct });
    } 
    catch (err) {
        console.log("Couldn't process new product. Error:", err.message);
        res.status(400).send({ error: err.message });
    }
}

const getAllProducts = async (req, res) => {;

    const products = await ProductService.findAllProducts();

    if (products.length == 0) {
        res.status(200).send({ message: 'No products' });
    }
    else {
        res.status(200).send({ message: 'Products retrieved', data: products });
    }
}

const getAllActiveProductsByCategory = async (req, res) => {
    const category = req.params.category;
    console.log(`Category received: <${category}>`);

    const products = await ProductService.findAllActiveProductsByCategory(category);

    if (products.length == 0) {
        res.status(200).send({ message: 'No products for this category' });
    }
    else {
        res.status(200).send({ message: 'Products retrieved', data: products });
    }
}

const updateProductInfo = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedProduct = await ProductService.updateProductInfo(id, req.body);
        res.status(200).send({ message: 'Product updated', data: updatedProduct });
    } 
    catch (err) {
        res.status(400).send({ error: err.message });
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getAllActiveProductsByCategory,
    updateProductInfo
};