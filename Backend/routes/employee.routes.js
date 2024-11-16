const express = require('express');
const { register, login, getAllEmployees } = require('../controllers/Employee.controller');
const { submitPOForm, getProductOptions } = require('../controllers/POFormController');
const { createOrder } = require('../controllers/New Controllers/orderController');
const {  getAllProductsWithQuantities, addOrUpdateInventory, addPart, getAllPartsWithQuantities } = require('../controllers/New Controllers/productController');
const empRouter = express.Router();

// Register route
empRouter.post('/register', register);

// Login route
empRouter.post('/login', login);

empRouter.get('/all-employees', getAllEmployees);

empRouter.post('/po-form', submitPOForm); // Submit PO Form
empRouter.get('/products/:productId/options', getProductOptions);
empRouter.get('/allProducts', getAllProductsWithQuantities);
empRouter.get('/allParts', getAllPartsWithQuantities);
empRouter.post('/addParts', addPart);
empRouter.post('/add-update-inventory', addOrUpdateInventory);
empRouter.post('/createOrder', createOrder);

module.exports = empRouter;
