const { Schema, model } = require('mongoose');

const ColorSchema = Schema({
    name: { type: String, required: true },
    hexValue: { type: String, required: true },
});

ColorSchema.statics.findByName = function (name) {
    return this.find({ 'name': name });
};

module.exports = model('Color', ColorSchema);