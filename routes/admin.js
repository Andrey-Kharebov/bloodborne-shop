const {
  Router
} = require('express');
const router = Router();
const admin = require('../middleware/admin');
const User = require('../models/user');
const Admin = require('../models/admin');
const Order = require('../models/order');
const OrderItem = require('../models/order-item');
const Product = require('../models/product');

router.get('/', admin, async (req, res) => {
  const user = req.user;
  const lastOrders = await req.user.adminLastOrders();
  const monthOrdersQuantity = await req.user.adminMonthOrdersQuantity();
  const monthUsersQuantity = await req.user.adminMonthUsersQuantity();

  res.render('admin-home', {
    layout: 'admin',
    title: 'Admin page',
    user,
    lastOrders,
    monthOrdersQuantity,
    monthUsersQuantity
  });
});

router.get('/users', admin, async (req, res) => {
  const user = req.user;
  const users = await req.user.adminFetchUsers();

  res.render('admin-users', {
    layout: 'admin',
    title: 'Admin users',
    user,
    users
  });
});

router.get('/orders', admin, async (req, res) => {
  const user = await req.user;
  const orders = await req.user.adminFetchOrders();

  res.render('admin-orders', {
    layout: 'admin',
    title: 'Admin orders',
    user,
    orders
  });
});

router.get('/catalog', admin, async (req, res) => {
  const user = await req.user;
  const categories = await req.user.adminFetchCategories();

  res.render('admin-catalog', {
    layout: 'admin',
    title: 'Admin catalog',
    user,
    categories
  });
});

router.get('/order/:id', admin, async (req, res) => {
  const order = await Order.findOne({
    where: {
      id: req.params.id
    },
    include: [{
        model: OrderItem
      },
      {
        model: Product
      }
    ]
  });


  res.render('admin-order', {
    layout: 'admin',
    title: 'Admin order',
    order
  });
});

router.post('/order/:id', admin, async (req, res) => {
  const order = await Order.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: OrderItem
    }
  });
  // const orderItem = await OrderItem.findOne({
  //   where: {
  //     id: req.body.id
  //   }
  // });

  order.update({
    surname: req.body.surname,
    name: req.body.name,
    patronymic: req.body.patronymic,
    phone: req.body.phone,
    email: req.body.email,
    country: req.body.country,
    town: req.body.town,
    region: req.body.region,
    address: req.body.address,
    zipcode: req.body.zipcode
  });

  // orderItem.update({
  //   size: req.body.size,
  //   quantity: req.body.quantity
  // });

  console.log(req.body);
  res.redirect(`/admin/order/${req.params.id}`);
});

router.post('/orderitem/:id', admin, async (req, res) => {

  const order = await Order.findOne({
    where: {
      id: req.body.orderId
    },
    include: {
      model: OrderItem
    }
  });

  order.orderItems.forEach(async (item) => {
    if (item.id === +req.body.id) {
      const orderItem = await OrderItem.findOne({
        where: {
          id: req.body.id
        }
      });
      await orderItem.update({
        size: req.body.size,
        quantity: req.body.quantity
      });
    }
  });

  console.log(req.body);
  res.redirect(`/admin/order/${req.body.orderId}`);
});

module.exports = router;