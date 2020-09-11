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

// CLEARDB_DATABASE_URL => mysql://[username]:[password]@[host]/[database name]?reconnect=true


// const DB_NAME = 'heroku_48211aba3860de9',
//       USER_NAME = 'b1f00dbed9c6d1',
//       PASSWORD = 'c9533d9e';

// const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
//   host: 'us-cdbr-east-02.cleardb.com',
//   dialect: 'mysql',
//   dialectOptions: {
//     supportBigNumbers: true
//   }
// });

module.exports = sequelize;