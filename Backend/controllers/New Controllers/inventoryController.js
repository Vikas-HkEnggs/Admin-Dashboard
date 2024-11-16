const { Inventory, Parts, Products } = require('../../models/NewModel/index');

// Check product availability in inventory
const checkProductAvailability = async (req, res) => {
  try {
    const { product_id } = req.params;
    const productInventory = await Inventory.findOne({ where: { product_id } });

    if (!productInventory || productInventory.quantity_available <= 0) {
      return res.status(200).json({ available: false, message: 'Product not available in inventory' });
    }

    res.status(200).json({ available: true, quantity: productInventory.quantity_available });
  } catch (error) {
    res.status(500).json({ message: 'Error checking product availability', error });
  }
};

// Check part availability in inventory
const checkPartAvailability = async (req, res) => {
  try {
    const { part_id } = req.params;
    const partInventory = await Inventory.findOne({ where: { part_id } });

    if (!partInventory || partInventory.quantity_available <= 0) {
      return res.status(200).json({ available: false, message: 'Part not available in inventory' });
    }

    res.status(200).json({ available: true, quantity: partInventory.quantity_available });
  } catch (error) {
    res.status(500).json({ message: 'Error checking part availability', error });
  }
};

module.exports = { checkProductAvailability, checkPartAvailability };