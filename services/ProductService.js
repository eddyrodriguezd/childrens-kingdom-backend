const ProductSchema = require('../models/Product');
const UploadService = require('./utils/UploadService');

const saveProduct = async (file, product) => {
    const { title, description, price, category, availableColors } = product;
    if (title === undefined) throw new Error('Title is missing');
    if (description === undefined) throw new Error('Description is missing');
    if (price === undefined) throw new Error('Price is missing');
    if (category === undefined) throw new Error('Category is missing');

    const isActive = false;
    const url = await UploadService.uploadImage(file, category);

    const newProduct = new ProductSchema({ title, description, price, category, isActive, url });

    const savedProduct = await newProduct.save();
    console.log(`Product <${JSON.stringify(savedProduct)}> created`);
    return savedProduct;
};

const findAllActiveProductsByCategory = async (category) => {
    const products = await ProductSchema.findByCategoryAndIsActive(category);
    console.log(`Products retrieved: <${JSON.stringify(products)}>`);
    return products;
};

const updateProductInfo = async (id, { title, description, price, category }) => {
    if (title === undefined) throw new Error('Title is missing');
    if (description === undefined) throw new Error('Description is missing');
    if (price === undefined) throw new Error('Price is missing');
    if (category === undefined) throw new Error('Category is missing');

    const updateResult = await ProductSchema.updateOne({ '_id': id }, { $set: { title, description, price, category }}, {upsert: false});
    if(updateResult?.modifiedCount != 1) {
        throw new Error('No item was updated. Check product id and retry.');
    }
    
    console.log(`Product <${JSON.stringify({ title, description, price, category })}> updated`);
    return { title, description, price, category };
};

/*const findOneList = async (user, listId) => {
    const favList = await FavListSchema.findByUserAndId(user._id, listId);
    if (favList.length === 0) return null;

    console.log(`Fav List: <${JSON.stringify(favList[0])}> from user <${user}> retrieved`);
    return favList[0];
}

const addItemToList = async (user, listId, { title, description, link }) => {
    if (title === undefined) throw new Error('Title parameter is missing');
    if (description === undefined) throw new Error('Description parameter is missing');
    if (link === undefined) throw new Error('Link parameter is missing');

    const updateParams = await FavListSchema.addFavToList(user._id, listId, { title, description, link });
    return updateParams.modifiedCount === 1;
}

const removeList = async (user, listId) => {
    const deleteParams = await FavListSchema.removeFavList(user._id, listId);
    return deleteParams.deletedCount === 1;
}*/

module.exports = {
    saveProduct,
    findAllActiveProductsByCategory,
    updateProductInfo
};