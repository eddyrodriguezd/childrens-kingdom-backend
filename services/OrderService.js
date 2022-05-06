const OrderSchema = require('../models/Order');

const saveOrder = async ({ id, email }, { products, paymentTransactionId }) => {

    if (id === undefined || email === undefined) throw new Error('Client information is missing');

    products.forEach(p => {
        if (p.id === undefined || p.title === undefined || p.price === undefined ||
            p.quantity === undefined || p.category === undefined) throw new Error('Product information is missing');
    });

    const totalPrice = products.reduce((acc, cur) => cur.value + acc, 0);

    const newOrder = {
        client: {
            id,
            email
        },
        products,
        totalPrice,
        payment: {
            transactionId: paymentTransactionId,
            type: 'DEBIT/CREDIT CARD'
        },
        status: 'CONFIRMED'
    }

    const savedOrder = await newOrder.save();
    console.log(`Product <${JSON.stringify(savedOrder)}> created`);
    return savedOrder;
};

module.exports = {
    saveOrder
};