
const { Orders, Products, Parts, Inventory, ProductParts, OrderStatus } = require('../../models/NewModel/index');


const createOrder = async (req, res) => {
  try {
    const { customerName, customerEmail, product_code, quantity, optionsSelected } = req.body;

    // Find the product using product_code
    const product = await Products.findOne({ where: { product_code } });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Create the order
    const newOrder = await Orders.create({
      customerName,
      customerEmail,
      product_code,
      quantity,
      optionsSelected,
    });

    // Check inventory for the product
    const inventory = await Inventory.findOne({ where: { product_code } });
    let statusMessage;

    if (inventory && inventory.quantity_available >= quantity) {
      // Product is available, update inventory and order status
      await inventory.update({ quantity_available: inventory.quantity_available - quantity });
      await OrderStatus.create({ order_id: newOrder.order_id, status: 'Ready for Delivery' });
      statusMessage = 'Product is available and ready for delivery';
    } else {
      // Product is out of stock, create an indent
      await OrderStatus.create({ order_id: newOrder.order_id, status: 'Indent Created' });
      await checkAndIndentParts(product_code, newOrder.order_id);
      statusMessage = 'Product is out of stock; please create an indent for this order';
    }

    res.status(201).json({ newOrder, statusMessage });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error });
  }
};


// Check if parts are available or create indent
const checkAndIndentParts = async (product_code, order_id) => {
  const partsRequired = await ProductParts.findAll({ where: { product_code } });

  for (const part of partsRequired) {
    const partInventory = await Inventory.findOne({ where: { part_code: part.part_code } });
    if (!partInventory || partInventory.quantity_available < part.quantity_required) {
      await OrderStatus.create({ order_id, status: 'Indent Parts - Contact Vendor' });
      return;
    }
  }

  // If all parts are available, update order status
  await OrderStatus.create({ order_id, status: 'All Parts Available - Ready for Assembly' });
}; 

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { order_id, status } = req.body;

    const order = await Orders.findByPk(order_id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await OrderStatus.create({ order_id, status });
    res.status(200).json({ message: 'Order status updated' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status', error });
  }
};

module.exports = { createOrder, updateOrderStatus };
