// /routes/productRoutes.js
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/Product.controller');

// Admin route to create a product with options
router.post('/create', ProductController.createProductWithOptions);

// Get options for a specific product
router.get('/:productId/options', ProductController.getProductOptions);

module.exports = router;
