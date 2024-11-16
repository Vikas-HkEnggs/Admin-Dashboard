const express = require('express');
const adminRouter = require('./admin.routes');
const empRouter = require('./employee.routes');     
const orderRouter = require('./New Routes/orderRoutes');
const inventoryRouter = require('./New Routes/inventoryRoutes');
const router = express.Router();

router.use("/admin", adminRouter)
router.use("/emp", empRouter)
router.use("/admin", orderRouter)
// router.use("/admin", inventoryRouter)


module.exports = router