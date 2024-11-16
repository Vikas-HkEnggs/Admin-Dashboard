const express = require('express');
const { createProduct, submitPOForm, getProductOptions } = require('../controllers/POFormController');
const { createOrder } = require('../controllers/New Controllers/orderController');
const router = express.Router();

// Admin Routes
router.post('/admin/products', createProduct);

// User Routes
router.post('/po-forms', createOrder);
router.get('/products/:productId/options', getProductOptions);

module.exports = router;
