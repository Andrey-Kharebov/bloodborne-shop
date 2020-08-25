const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING
  },  
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  recommended: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
});

module.exports = Product;