const {Router} = require('express');
const router = Router();
const OrderItem = require('../models/order-item');
const Order = require('../models/order');



// LS Order Step 1
router.post('/:id/step1', async (req, res) => {
  const user = req.user;
  console.log(req.user);
  const cartId = req.body.id;
  res.render('order-step1', {
    title: 'Bloodborne shop',
    cartId: cartId
  });
});

// LS Order Step 2
router.post('/:id/step2', async (req, res) => {
  try {
    let userId;
    if (req.user) {
      userId = req.user.id;
    }
    let products = req.body.products;
    // console.log(req.body);

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
      .then((order) => {
        if (products.length > 60) {
          OrderItem.create({
            orderId: order.id,
            productId: products.split(',')[0],
            size: products.split(',')[3],
            quantity: products.split(',')[4]
          });
        } else {
          products.forEach(item => {
            OrderItem.create({
              orderId: order.id,
              productId: item.split(',')[0],
              size: item.split(',')[3],
              quantity: item.split(',')[4]
            });
          });
        }
        return order;
      });
    
    res.redirect(`/order/${order.id}/step2`);
  } catch (e) {
    console.log(e);
  }
});

router.get('/:id/step2', async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  res.render('order-step2', {
    title: 'Bloodborne shop',
    order: order
  });
});


module.exports = router;