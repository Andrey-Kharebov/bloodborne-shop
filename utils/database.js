const Sequelize = require('sequelize');

const DB_NAME = 'Bloodborne',
      USER_NAME = 'root',
      PASSWORD = 'a4563210';

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    supportBigNumbers: true
  }
});

module.exports = sequelize;