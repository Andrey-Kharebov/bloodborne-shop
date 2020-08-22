const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const ProductImage = sequelize.define('productImage', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  imageUrl: {
    type: Sequelize.STRING
  }
});

module.exports = ProductImage;