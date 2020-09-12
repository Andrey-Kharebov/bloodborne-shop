const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Category = sequelize.define('category', {
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
  rustitle: {
      type: Sequelize.STRING,
      allowNull: false
  }
});


module.exports = Category;
