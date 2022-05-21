const OrderSchema = require('../models/Order');
const { sendConfirmedOrderMail } = require('../services/utils/sendEmail');

const saveOrder = async (user, { products, payment }) => {

    const id = '6277ed3d0204989505c46be2';
    const email = 'eddyrodriguezdlc@gmail.com';
    if(user != null) {
        id = user.id;
        email = user.email;
    }
    //if (id === undefined || email === undefined) throw new Error('Client information is missing');

    products.forEach(p => {
        if (p.id === undefined || p.title === undefined || p.price === undefined ||
            p.quantity === undefined /*|| p.category === undefined*/) throw new Error('Product information is missing');
    });
    
    const totalPrice = products.map(p => p.price).reduce((acc, cur) => cur + acc, 0);
    console.log("Order's total price:", totalPrice);

    const newOrder = new OrderSchema({
        client: {
            id,
            email
        },
        products,
        totalPrice,
        payment,
        status: 'CONFIRMED'
    });

    const savedOrder = await newOrder.save();
    console.log(`Order <${JSON.stringify(savedOrder)}> created`);

    sendConfirmedOrderMail({
        to: email,
        templateId: process.env.SENDGRID_TEMPLATE_RESERVATION_CONFIRMED_ID,
        dynamic_template_data: {
            clientName: 'Eddy',
            id: savedOrder._id
        },
    });

    return savedOrder;
};

module.exports = {
    saveOrder
};