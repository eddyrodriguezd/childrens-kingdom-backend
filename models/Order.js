const { Schema, model } = require('mongoose');

const OrderSchema = Schema({
    client: {
        id: { type: String, required: true },
        email: { type: String, required: true, unique: true },
    },
    products: [{
        id: { type: String, required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        category: { type: String, required: true }
    }],
    totalPrice: { type: Number, required: true },
    payment: {
        transactionId: { type: String, required: false },
        type: { type: String, required: true }
    },
    status: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = model('Order', OrderSchema);