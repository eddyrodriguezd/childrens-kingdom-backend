const ColorService = require('../services/ColorService');

const getAllColors = async (req, res) => {
    const colors = await ColorService.findAllColors();

    if (colors.length == 0) {
        res.status(200).send({ message: 'No colors have been created yet' });
    }
    else {
        res.status(200).send({ message: 'Colors retrieved', data: colors });
    }
}

module.exports = {
    getAllColors
};