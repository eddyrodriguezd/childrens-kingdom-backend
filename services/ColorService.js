const ColorSchema = require('../models/Color');

const findAllColors = async () => {
    const colors = await ColorSchema.find({});
    console.log(`Colors retrieved: <${JSON.stringify(colors)}>`);
    return colors;
};

module.exports = {
    findAllColors
};