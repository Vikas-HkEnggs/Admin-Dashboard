const { DataTypes } = require('sequelize');
const { dbInstance } = require('../../config/db.config');

const Inventory = dbInstance.define('Inventory', {
  inventory_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  product_code: {
    type: DataTypes.STRING(100),
    references: {
      model: 'Products', 
      key: 'product_code',
    },
  },
  part_code: {
    type: DataTypes.STRING(100),
    references: {
      model: 'Parts',
      key: 'part_code',
    },
  },
  quantity_available: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Inventory;
