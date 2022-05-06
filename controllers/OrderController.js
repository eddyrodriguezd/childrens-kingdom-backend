const OrderService = require('../services/OrderService');

const createOrder = async (req, res) => {
    try {
        console.log(`Order received: <${JSON.stringify(req.body)}>`);

        const newOrder = await OrderService(req.user, req.body);
        res.status(200).send({ message: 'New order created', data: newOrder });
    } 
    catch (err) {
        res.status(400).send({ error: err.message });
    }
}

module.exports = {
    createOrder
};