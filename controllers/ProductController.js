const ProductService = require('../services/ProductService');

const createProduct = async (req, res) => {
    try {
        console.log('req', req);
        console.log('req.product', req.product);
        console.log('body', req.body);
        const product = await ProductService.saveProduct(req.body);
        res.status(200).send({ message: 'New product created', data: product });
    } catch (err) {
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
    getAllActiveProductsByCategory
};