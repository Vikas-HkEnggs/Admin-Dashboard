// routes/adminRoutes.js
const express = require('express');
const { createProductWithOptions, getAllProduct } = require('../controllers/Product.controller');
const { addProduct } = require('../controllers/New Controllers/productController');
const adminRouter = express.Router();

// Admin route to create a product with options
adminRouter.post('/add-products', createProductWithOptions);
adminRouter.get('/products', getAllProduct);
adminRouter.post('/addProducts', addProduct);

// adminRouter.get('/allProducts', getAllProducts);

module.exports = adminRouter;
