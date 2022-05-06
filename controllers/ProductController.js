const ProductService = require('../services/ProductService');

const createProduct = async (req, res) => {
    try {
        const {file} = req;
        const {product} = req.body;
        console.log(`Product received: <${product}> with image <${file.originalname}>`);

        const newProduct = await ProductService.saveProduct(file, JSON.parse(product));
        res.status(200).send({ message: 'New product created', data: newProduct });
    } 
    catch (err) {
        res.status(400).send({ error: err.message });
    }
}

const getAllActiveProductsByCategory = async (req, res) => {
    const category = req.params.category;
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

/*const getOne = async (req, res) => {
    const listId = req.params.id;
    const favList = await FavListService.findOneList(req.user, listId);

    if (favList === null) {
        res.status(400).send({ error: `No Favorite\'s list available for id <${listId}>` });
    }
    else {
        res.status(200).send({ message: `Favorite\'s list with id <${listId}> retrieved`, data: favList });
    }
}

const addItem = async (req, res) => {
    const listId = req.params.id;
    const newFav = req.body;

    try {
        const updated = await FavListService.addItemToList(req.user, listId, newFav);
        if (!updated) {
            res.status(400).send({ error: `No Favorite\'s list available for id <${listId}>` });
        }
        else {
            res.status(200).send({ message: `Item added to Favorite\'s list with id <${listId}>`, data: newFav });
        }
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

const deleteList = async (req, res) => {
    const listId = req.params.id;
    const deleted = await FavListService.removeList(req.user, listId);

    if (!deleted) {
        res.status(400).send({ error: `No Favorite\'s list available for id <${listId}>` });
    }
    else {
        res.status(200).send({ message: `Favorite\'s List with id <${listId}> deleted` });
    }
}*/

module.exports = {
    createProduct,
    getAllActiveProductsByCategory,
    updateProductInfo
};