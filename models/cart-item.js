const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const CartItem = sequelize.define('cartItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    size:{
      type: Sequelize.STRING
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
});

module.exports = CartItem;