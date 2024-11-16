const { DataTypes } = require('sequelize');
const { dbInstance } = require('../../config/db.config');

const Part = dbInstance.define('Part', {
  part_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  part_code: {
    type: DataTypes.STRING(100),
    unique: true,
  },
  part_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
}, {
  timestamps: true,
});

module.exports = Part;
