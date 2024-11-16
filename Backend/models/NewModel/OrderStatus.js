const { DataTypes } = require('sequelize');
const { dbInstance } = require('../../config/db.config');

const OrderStatus = dbInstance.define('OrderStatus', {
  status_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: 'Orders',
      key: 'order_id',
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
});

module.exports = OrderStatus;
