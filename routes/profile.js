const {Router} = require('express');
const auth = require('../middleware/auth');
const User = require('../models/user');
const Order = require('../models/order');
const OrderItem = require('../models/order-item');
const Product = require('../models/product');
const router = Router();

router.get('/', auth, async (req, res) => {
  const user = await User.findByPk(req.session.user.id);
  res.render('profile', {
    title: 'Profile',
    isMyProfile: true,
    user
  });
});

router.post('/:id', auth, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  user.update({
    name: req.body.name,
    surname: req.body.surname,
    patronymic: req.body.patronymic,
    phone: req.body.phone,
    country: req.body.country,
    town: req.body.town,
    region: req.body.region,
    address: req.body.address,
    zipcode: req.body.zipcode
  });
  res.render('profile', {
    title: 'Profile',
    isMyProfile: true,
    user
  });
});

router.get('/orders', auth, async (req, res) => {
  const user = await User.findByPk(req.session.user.id);
  const orders = await Order.findAll({
    where: {
      userId: req.session.user.id
    },
    include: [
      {
        model: Product
      },
      {
        model: OrderItem
      }
    ]
  });

  // orders.forEach(item => {
  //   item.products.forEach(async product => {
  //     let orderItems = await Promise.all(orders.map(async (item) => {
  //       return await OrderItem.findAll({
  //         where: {
  //           productId: product.id
  //         }
  //       });
  //     }));
  //     product.dataValues.orderItem = orderItems;
  //   });
  // });



  res.render('profile-orders', {
    title: 'My orders',
    isMyOrders: true,
    user,
    orders
  });
});

router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    const toChange = {
      name: req.body.name
    };

    if (req.file) {
      toChange.avatarUrl = req.file.path;
    }

    Object.assign(user, toChange);
    await user.save();
    res.redirect('/profile');
  } catch (e) {
   console.log(e); 
  }
});

module.exports = router;