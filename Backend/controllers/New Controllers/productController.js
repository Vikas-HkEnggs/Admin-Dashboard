const Inventory = require("../../models/NewModel/Inventory");
const Part = require("../../models/NewModel/Part");
const Product = require("../../models/NewModel/Product");

const addProduct = async (req, res) => {
  try {
    const { product_name, product_code } = req.body;
    const product = await Product.create({ product_name, product_code });
    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Failed to create product." });
  }
};
const addPart = async (req, res) => {
  try {
    const { part_name, part_code } = req.body;
    const product = await Part.create({ part_name, part_code });
    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Failed to create part." });
  }
};

const getAllProductsWithQuantities = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Inventory,
          attributes: ["quantity_available"],
          required: false,
        },
      ],
    });

    // Default quantity if no inventory record exists
    const productsWithQuantities = products.map((product) => ({
      ...product.toJSON(),  // Convert Sequelize instance to plain object
      quantity_available: product.Inventory ? product.Inventory.quantity_available : 0,
    }));

    res.status(200).json({ products: productsWithQuantities });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve products with quantities." });
  }
};


const getAllPartsWithQuantities = async (req, res) => {
  try {
    const parts = await Part.findAll({
      include: [
        {
          model: Inventory,
          attributes: ["quantity_available"],
          required: false,
        },
      ],
     
    });

    // Default quantity if no inventory record exists
    const partsWithQuantities = parts.map((part) => ({
      ...part.toJSON(),
      quantity_available: part.Inventory ? part.Inventory.quantity_available : 0,
    }));

    res.status(200).json({ parts: partsWithQuantities });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve parts with quantities." });
  }
};


const addOrUpdateInventory = async (req, res) => {
  try {
    const { product_code, part_code, quantity_available } = req.body;
    console.log(quantity_available, "quantity_available");

    if (!product_code && !part_code) {
      return res.status(400).json({ message: "Please provide either product_code or part_code." });
    }

    const inventory = await Inventory.findOne({
      where: product_code ? { product_code } : { part_code },
    });

    if (inventory) {
      inventory.quantity_available += quantity_available;
      await inventory.save();
      res.status(200).json({
        message: "Inventory quantity updated.",
        inventory,
      });
    } else {
      const newInventory = await Inventory.create({
        product_code,
        part_code,
        quantity_available,
      });
      res.status(201).json({
        message: "Quantity added to inventory.",
        inventory: newInventory,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to add or update inventory quantity." });
  }
};




module.exports = {
  addProduct,
  addPart,
  getAllProductsWithQuantities,
  getAllPartsWithQuantities,
  addOrUpdateInventory
};
