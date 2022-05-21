const { Schema, model } = require('mongoose');

const OrderSchema = Schema({
    client: {
        id: { type: String, required: true },
        email: { type: String, required: false },
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
        token: { type: String, required: false },
        payer: {
            email: { type: String, required: false },
            identification: {
                type: { type: String, required: false },
                number: { type: String, required: false },
            }
        },
        installments: { type: Number, required: false },
    },
    status: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = model('Order', OrderSchema);