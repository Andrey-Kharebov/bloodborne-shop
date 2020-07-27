const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Order = sequelize.define('order', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  totalPrice: {
    type: Sequelize.INTEGER
  },
  deliveryPrice: {
    type: Sequelize.INTEGER
  },
  totalCost: {
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  surname: {
    type: Sequelize.STRING
  },
  patronymic: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  country: {
    type: Sequelize.STRING
  },
  town: {
    type: Sequelize.STRING
  },
  region: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  zipcode: {
    type: Sequelize.STRING
  },
  paid: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Order;