const { DataTypes } = require('sequelize');
const { dbInstance } = require('../../config/db.config');

const Vendor = dbInstance.define('Vendor', {
  vendor_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  vendor_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
}, {
  timestamps: false,
});

module.exports = Vendor;
