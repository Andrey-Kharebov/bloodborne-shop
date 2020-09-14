const Sequelize = require('sequelize');
const {Op} = require('sequelize');
const sequelize = require('../utils/database');
const Order = require('../models/order');
const OrderItem = require('../models/order-item');
const Category = require('../models/category');
const Product = require('../models/product');

let offset = +3;
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
  resetToken: {
    type: Sequelize.STRING,
  },
  resetTokenExp: {
    type: Sequelize.DATE
  },
  createdAt: {
    type: Sequelize.DataTypes.DATE,
    defaultValue: new Date(new Date().getTime() + offset * 3600 * 1000)
  },
  updatedAt: {
    type: Sequelize.DataTypes.DATE,
    defaultValue: new Date(new Date().getTime() + offset * 3600 * 1000)
  }
});

User.prototype.adminLastOrders = async function () {
  const orders = await Order.findAll({
    limit: 5,
    order: [
      ['id', 'DESC']
    ]
  });

  return orders;
};

User.prototype.adminMonthOrdersQuantity = async function () {
  let firstDayPrevMonth = new Date();
  firstDayPrevMonth.setMonth(firstDayPrevMonth.getMonth() - 1);
  firstDayPrevMonth.setDate(1);
  firstDayPrevMonth.setHours(3, 0, 0, 0);

  let firstDayCurMonth = new Date();
  firstDayCurMonth.setDate(1);
  firstDayCurMonth.setHours(3, 0, 0, 0);

  // let yesterday = new Date();
  // yesterday.setDate(yesterday.getDate() - 1);
  // yesterday.setHours(3, 0, 0, 0);

  // let today = new Date();
  // today.setHours(3, 0, 0, 0);

  let offset = +3;

  let prevMonthQuery = {
    where: {
      createdAt: {
        [Op.gte]: firstDayPrevMonth,
        [Op.lt]: firstDayCurMonth
      }
    }
  }

  let curMonthQuery = {
    where: {
      createdAt: {
        [Op.gte]: firstDayCurMonth,
        [Op.lt]: new Date(new Date().getTime() + offset * 3600 * 1000)
      }
    }
  };

  // let yesterdayQuery = {
  //   where: {
  //     createdAt: {
  //       [Op.gte]: yesterday,
  //       [Op.lt]: today
  //     }
  //   }
  // };

  // let todayQuery = {
  //   where: {
  //     createdAt: {
  //       [Op.gte]: today,
  //       [Op.lt]: new Date(new Date().getTime() + offset * 3600 * 1000)
  //     }
  //   }
  // };

  let prevMonth = await Order.findAll(prevMonthQuery);
  let curMonth = await Order.findAll(curMonthQuery);
  let a = prevMonth;
  let b = curMonth;


  // let yesterdayDay = await Order.findAll(yesterdayQuery);
  // let todayDay = await Order.findAll(todayQuery);
  // let a = yesterdayDay;
  // let b = todayDay;

  let ordersStatistic = {
    increase: 0,
    percents: 0
  };

  if (a > b) {
    ordersStatistic.increase = -(a.length - b.length);
    ordersStatistic.percents = 0;
  } else if (b > a) {
    ordersStatistic.increase = (b.length - a.length);
  } else {
    ordersStatistic.increase = 0;
  }

  ordersStatistic.percents = ((b.length - a.length) / a.length * 100);
  if (ordersStatistic.percents < 0) {
    ordersStatistic.percents = 0;
  }

  if (ordersStatistic.increase > 0) {
    ordersStatistic.increase = '+' + ordersStatistic.increase;
  }

  return ordersStatistic;

};

User.prototype.adminMonthUsersQuantity = async function () {
  let firstDayPrevMonth = new Date();
  firstDayPrevMonth.setMonth(firstDayPrevMonth.getMonth() - 1);
  firstDayPrevMonth.setDate(1);
  firstDayPrevMonth.setHours(3, 0, 0, 0);

  let firstDayCurMonth = new Date();
  firstDayCurMonth.setDate(1);
  firstDayCurMonth.setHours(3, 0, 0, 0);

  // let yesterday = new Date();
  // yesterday.setDate(yesterday.getDate() - 1);
  // yesterday.setHours(3, 0, 0, 0);

  // let today = new Date();
  // today.setHours(3, 0, 0, 0);

  let offset = +3;
  // console.log(yesterday);
  // console.log(today);
  console.log(firstDayPrevMonth);
  console.log(firstDayCurMonth);

  let prevMonthQuery = {
    where: {
      createdAt: {
        [Op.gte]: firstDayPrevMonth,
        [Op.lt]: firstDayCurMonth
      }
    }
  }

  let curMonthQuery = {
    where: {
      createdAt: {
        [Op.gte]: firstDayCurMonth,
        [Op.lt]: new Date(new Date().getTime() + offset * 3600 * 1000)
      }
    }
  };


  // let yesterdayQuery = {
  //   where: {
  //     createdAt: {
  //       [Op.gte]: yesterday,
  //       [Op.lt]: today
  //     }
  //   }
  // };

  // let todayQuery = {
  //   where: {
  //     createdAt: {
  //       [Op.gte]: today,
  //       [Op.lt]: new Date(new Date().getTime() + offset * 3600 * 1000)
  //     }
  //   }
  // };

  let prevMonth = await User.findAll(prevMonthQuery);
  let curMonth = await User.findAll(curMonthQuery);
  let a = prevMonth;
  let b = curMonth;

  // let yesterdayDay = await User.findAll(yesterdayQuery);
  // let todayDay = await User.findAll(todayQuery);
  // let a = yesterdayDay;
  // let b = todayDay;

  let usersStatistic = {
    increase: 0,
    percents: 0
  };

  if (a > b) {
    usersStatistic.increase = -(a.length - b.length);
    usersStatistic.percents = 0;
  } else if (b > a) {
    usersStatistic.increase = (b.length - a.length);
  } else {
    usersStatistic.increase = 0;
  }

  usersStatistic.percents = ((b.length - a.length) / a.length * 100);
  if (usersStatistic.percents < 0) {
    usersStatistic.percents = 0;
  }

  if (usersStatistic.increase > 0) {
    usersStatistic.increase = '+' + usersStatistic.increase;
  }

  return usersStatistic;
};

User.prototype.adminProfitSum = async function() {
  let firstDayPrevMonth = new Date();
  firstDayPrevMonth.setMonth(firstDayPrevMonth.getMonth() - 1);
  firstDayPrevMonth.setDate(1);
  firstDayPrevMonth.setHours(3, 0, 0, 0);

  let firstDayCurMonth = new Date();
  firstDayCurMonth.setDate(1);
  firstDayCurMonth.setHours(3, 0, 0, 0);

  let offset = +3;

  let prevMonthQuery = {
    where: {
      createdAt: {
        [Op.gte]: firstDayPrevMonth,
        [Op.lt]: firstDayCurMonth
      }
    }
  }

  let curMonthQuery = {
    where: {
      createdAt: {
        [Op.gte]: firstDayCurMonth,
        [Op.lt]: new Date(new Date().getTime() + offset * 3600 * 1000)
      }
    }
  };

  let prevMonth = await Order.findAll(prevMonthQuery);
  let prevMonthCompleted = prevMonth.filter(order => order.status == 'completed');
  let prevMonthCompletedProfit = 0;
  prevMonthCompleted.forEach(order => {
    prevMonthCompletedProfit += order.totalCost;
  })

  let curMonth = await Order.findAll(curMonthQuery);
  let curMonthCompleted = curMonth.filter(order => order.status == 'completed');
  let curMonthCompletedProfit = 0;
  curMonthCompleted.forEach(order => {
    curMonthCompletedProfit += order.totalCost;
  })

  let a = prevMonthCompletedProfit;
  let b = curMonthCompletedProfit;

  let profitStatistic = {
    increase: 0,
    percents: 0
  };

  if (a > b) {
    profitStatistic.increase = -(a - b);
    profitStatistic.percents = 0;
  } else if (b > a) {
    profitStatistic.increase = (b - a);
  } else {
    profitStatistic.increase = 0;
  }

  profitStatistic.percents = ((b - a) / a * 100);
  if (profitStatistic.percents < 0) {
    profitStatistic.percents = 0;
  }

  if (profitStatistic.increase > 0) {
    profitStatistic.increase = '+' + profitStatistic.increase;
  }

  return profitStatistic;
}

User.prototype.adminFetchUsers = async function () {
  const users = await User.findAll({
    order: [
      ['createdAt', 'DESC']
    ],
    include: {
      model: Order
    }
  });

  let completedOrders = 0,
    rejectedOrders = 0,
    processingOrders = 0;

  for (let key in users) {
    for (let order in users[key].orders) {
      // console.log(users[key].orders[order].status);

      if (users[key].orders[order].status == 'completed') {
        completedOrders++;
      } else if (users[key].orders[order].status == 'rejected') {
        rejectedOrders++;
      } else {
        processingOrders++;
      }
    }
    users[key].completedOrders = completedOrders;
    users[key].rejectedOrders = rejectedOrders;
    users[key].processingOrders = processingOrders;
  }

  users.forEach(item => {
    let date = new Date(item.dataValues.createdAt);
    date = (date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear());
    item.dataValues.createdAt = date;

    let ordersQuantity = item.orders.length;

    item.orders.reverse(); // от последнего к первому
    item.orders.splice(4); // обрезание после 4-го элемента

    item.orders.forEach(i => {
      let date = new Date(i.dataValues.createdAt);
      date = (date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear());
      i.dataValues.createdAt = date;
    });

    item.orders.length = ordersQuantity; // задает изначальное значение, т.к. после splice значение = 4
  });

  return users;
};

User.prototype.adminFetchOrders = async function (user) {
  if (user) {
    const orders = await Order.findAll({
      where: {
        userId: user.id
      },
      order: [
        ['id', 'DESC']
      ],
      include: {
        model: OrderItem
      }
    });
    return orders;

  } else {
    const orders = await Order.findAll({
      order: [
        ['id', 'DESC']
      ],
      include: {
        model: OrderItem
      }
    });
    return orders;

  }

};

User.prototype.adminFetchCategories = async function () {
  const categories = await Category.findAll({
    include: {
      model: Product
    }
  });

  return categories;
};

module.exports = User;