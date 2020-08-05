const Sequelize = require('sequelize');
const sequelize = require('../utils/database');


const OrderItem = sequelize.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  size: Sequelize.STRING,
  quantity: Sequelize.INTEGER
});

module.exports = OrderItem;