const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: false },
    url: { type: String, required: true },
}, {
    timestamps: true
});

ProductSchema.statics.findByCategory = function (category) {
    return this.find({ 'category': category });
};

ProductSchema.statics.findByCategoryAndIsActive = function (category) {
    return this.find({ 'category': category, 'isActive': true });
};

module.exports = model('Product', ProductSchema);