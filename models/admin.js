const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Admin = sequelize.define('admin', {
  id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
  }
});


module.exports = Admin;