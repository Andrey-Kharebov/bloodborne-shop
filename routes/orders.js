const {
  Router
} = require('express');
const router = Router();
const OrderItem = require('../models/order-item');
const Order = require('../models/order');
const User = require('../models/user');

// Fetch
router.get('/check/:id', async (req, res) => {
  const order = await Order.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: OrderItem
    }
  });
  res.status(200).json(order); 
})
router.post('/step2', async (req, res) => {
  try {
    
    let products = [];
    let string = 'product';

    // console.log(req.body);
    for (let key in req.body) {
      if (key.includes(string)) {
        products.push(req.body[key])
        // console.log(key);
        // console.log(req.body[key]);
      }
    }
    console.log(products.length);
    console.log(products);
    products.forEach(item => {
      console.log(item.split(',')[1]);
    })
    
    let userId;
    if (req.session.user) {
      userId = req.session.user.id;
    }

    let order = await Order.create({
      totalPrice: req.body.totalPrice,
      deliveryPrice: req.body.deliveryPrice,
      totalCost: req.body.totalCost,
      name: req.body.name,
      surname: req.body.surname,
      patronymic: req.body.patronymic,
      phone: req.body.phone,
      email: req.body.email,
      country: req.body.country,
      town: req.body.town,
      region: req.body.region,
      address: req.body.address,
      zipcode: req.body.zipcode,
      userId: userId
    })
    .then(order => {
      products.forEach(item => {
        OrderItem.create({
          orderId: order.id,
          productId: item.split(',')[0],
          title: item.split(',')[1],
          size: item.split(',')[3],
          quantity: item.split(',')[4]
        })
      })
      return order;
    })
    res.status(200).json(order); 
  } catch (e) {
    console.log(e);
  }
});


// LS Order Step 1
router.post('/:id/step1', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  const cartId = req.body.id;
  res.render('order-step1', {
    title: 'Bloodborne shop',
    cartId: cartId,
    user
  });
});


// LS Order Step 2


// router.get('/:id/step2', async (req, res) => {
//   const order = await Order.findByPk(req.params.id);

//   res.render('order-step2', {
//     title: 'Bloodborne shop',
//     order: order
//   });
// });


module.exports = router;