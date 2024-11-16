const { dbInstance } = require('../../config/db.config');

const db = {};
db.Sequelize = dbInstance.Sequelize;
db.sequelize = dbInstance;

// Import models here
db.Products = require('./Product');
db.Parts = require('./Part');
db.ProductParts = require('./ProductPart');
db.Orders = require('./Order');
db.Inventory = require('./Inventory');
db.Vendors = require('./Vendor');
db.SellParty = require('./SellParty');
db.OrderStatus = require('./OrderStatus');

// One-to-Many: Order has multiple OrderStatus entries
db.Orders.hasMany(db.OrderStatus, { foreignKey: 'order_id' });
db.OrderStatus.belongsTo(db.Orders, { foreignKey: 'order_id' });

// Many-to-Many: Products and Parts are connected via ProductParts
db.Products.belongsToMany(db.Parts, { through: db.ProductParts, foreignKey: 'product_code' });
db.Parts.belongsToMany(db.Products, { through: db.ProductParts, foreignKey: 'part_code' });

// Product and Part associations with Inventory
// Ensure 'product_code' and 'part_code' are unique/primary keys in Products and Parts
db.Products.hasOne(db.Inventory, { foreignKey: 'product_code', sourceKey: 'product_code' });
db.Inventory.belongsTo(db.Products, { foreignKey: 'product_code', targetKey: 'product_code' });

db.Parts.hasOne(db.Inventory, { foreignKey: 'part_code', sourceKey: 'part_code' });
db.Inventory.belongsTo(db.Parts, { foreignKey: 'part_code', targetKey: 'part_code' });

module.exports = db;
