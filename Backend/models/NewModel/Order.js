const { DataTypes } = require('sequelize');
const { dbInstance } = require('../../config/db.config');
const Product = require('./Product');
const Part = require('./Part');

const Order = dbInstance.define('Order', {
  order_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  product_code: {
    type: DataTypes.STRING(100),
    allowNull: true,
    references: {
      model: Product,
      key: 'product_code', 
    },
  },
  part_code: {
    type: DataTypes.STRING(100),
    allowNull: true,
    references: {
      model: Part,
      key: 'part_code', 
    },
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  quantity: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  optionsSelected: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  // total_price: {
  //   type: DataTypes.DECIMAL(10, 2),
  //   allowNull: false,
  // },
  status: {
    type: DataTypes.ENUM('Pending', 'Processing', 'Ready for Delivery', 'Delivered', 'Completed', 'Canceled'),
    defaultValue: 'Pending',
  },
}, {
  timestamps: true,
  tableName: 'orders',
});

module.exports = Order;
