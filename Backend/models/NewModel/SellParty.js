const { DataTypes } = require('sequelize');
const { dbInstance } = require('../../config/db.config');

const SellParty = dbInstance.define('SellParty', {
  sellParty_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sellParty_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
}, {
  timestamps: false,
});

module.exports = SellParty;
