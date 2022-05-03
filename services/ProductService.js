const ProductSchema = require('../models/Product');

const saveProduct = async ({ title, description, price, category, isActive, url }) => {
    if (title === undefined) throw new Error('title parameter is missing');
    if (description === undefined) throw new Error('description parameter is missing');

    const product = new ProductSchema({ title, description, price, category, isActive, url });

    const savedProduct = await product.save();
    console.log(`Product <${JSON.stringify(savedProduct)}> created`);
    return savedProduct;
};

const findAllActiveProductsByCategory = async (category) => {
    const products = await ProductSchema.findByCategoryAndIsActive(category);
    console.log(`Products retrieved: <${JSON.stringify(products)}>`);
    return products;
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
    findAllActiveProductsByCategory
};