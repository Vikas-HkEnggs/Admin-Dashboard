const express = require('express');
const { createOrder, updateOrderStatus } = require('../../controllers/New Controllers/orderController');
const orderRouter = express.Router();

// Route to create a new order
orderRouter.post('/', createOrder);

// Route to update order status
orderRouter.post('/status', updateOrderStatus);

module.exports = orderRouter;
