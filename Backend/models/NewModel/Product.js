const { DataTypes } = require('sequelize');
const { dbInstance } = require('../../config/db.config');


const Product = dbInstance.define('Product', { 
  product_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_code: {
    type: DataTypes.STRING(100),
    unique: true,
  },
  // price: {
  //   type: DataTypes.DECIMAL(10, 2),
  //   allowNull: false,
  // },
}, {
  timestamps: true,
  tableName: 'Products',
});

module.exports = Product;
