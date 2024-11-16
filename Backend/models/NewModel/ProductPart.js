const { DataTypes } = require('sequelize');
const { dbInstance } = require('../../config/db.config');

const ProductPart = dbInstance.define('ProductPart', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Products', // Use the exact table name
      key: 'product_id',
    },
  },
  part_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Parts', // Use the exact table name for Part model
      key: 'part_id',
    },
  },
  quantity_required: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'ProductParts', // Explicitly set table name if required
});

module.exports = ProductPart;
