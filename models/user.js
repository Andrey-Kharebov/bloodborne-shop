const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('user', {
  id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }, 
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  admin: {
    type: Sequelize.BOOLEAN,
    dafaultValue: false
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
});


module.exports = User;
