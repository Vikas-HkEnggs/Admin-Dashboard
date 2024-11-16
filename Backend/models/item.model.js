const { DataTypes } = require('sequelize');
const { dbInstance } = require('../config/db.config');

// Product Model
const Item = dbInstance.define('item', {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    productCode: { type: DataTypes.STRING, allowNull: false, unique: true },
});

// Option Model
const Option = dbInstance.define('option', {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    productId: { 
        type: DataTypes.INTEGER.UNSIGNED, 
        allowNull: false, 
        references: { model: 'items', key: 'id' } 
    },
    name: { type: DataTypes.STRING, allowNull: false },
    values: { type: DataTypes.JSON, allowNull: true }, // Dropdown options stored as JSON array
    type: { 
        type: DataTypes.ENUM('dropdown', 'text', 'number', 'boolean'), 
        allowNull: false 
    },
});

// SubOption Model
const SubOption = dbInstance.define('subOption', {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    optionId: { 
        type: DataTypes.INTEGER.UNSIGNED, 
        allowNull: false, 
        references: { model: 'options', key: 'id' } 
    },
    title: { type: DataTypes.STRING, allowNull: false },
    type: { 
        type: DataTypes.ENUM('text', 'number', 'dropdown'), 
        allowNull: false 
    },
});

// SubSubOption Model
const SubSubOption = dbInstance.define('subSubOption', {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    subOptionId: { 
        type: DataTypes.INTEGER.UNSIGNED, 
        allowNull: false, 
        references: { model: 'subOptions', key: 'id' } 
    },
    title: { type: DataTypes.STRING, allowNull: false },
    type: { 
        type: DataTypes.ENUM('text', 'dropdown'), 
        allowNull: false 
    },
});

// Define associations
// Item model
Item.hasMany(Option, { foreignKey: 'productId', as: 'options' });
Option.belongsTo(Item, { foreignKey: 'productId' });



Option.hasMany(SubOption, { foreignKey: 'optionId', as: 'subOptions' });
SubOption.belongsTo(Option, { foreignKey: 'optionId' });

SubOption.hasMany(SubSubOption, { foreignKey: 'subOptionId', as: 'subSubOptions' });
SubSubOption.belongsTo(SubOption, { foreignKey: 'subOptionId' });




module.exports = { Item, Option, SubOption, SubSubOption };
