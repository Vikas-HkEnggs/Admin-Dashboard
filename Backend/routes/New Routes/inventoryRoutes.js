const express = require('express');
const { checkPartAvailability, checkProductAvailability } = require('../../controllers/New Controllers/inventoryController');
const inventoryRouter = express.Router();

// Route to check product availability
inventoryRouter.get('/product/:product_id', checkProductAvailability);

// Route to check part availability
inventoryRouter.get('/part/:part_id', checkPartAvailability);

module.exports = inventoryRouter;
