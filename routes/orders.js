const {Router} = require('express');
const router = Router();
const OrderItem = require('../models/order-item');
const Order = require('../models/order');



// LS Order Step 1
router.post('/:id/step1', async (req, res) => {
  res.render('order-step1', {
    title: 'Bloodborne shop',
    orderId: req.body.id
  });
});

// LS Order Step 2
router.post('/:id/step2', async (req, res) => {
  try {
    console.log(req.body);
    let products = req.body.products;

    await Order.create({
      id: req.body.orderId,
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
      zipcode: req.body.zipcode
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
        // let length = products.split(',').length;
        // console.log(length);
        // if (products.split(',').length > 7) {
          
          // console.log('more than one')
          // products.forEach(item => {
          //   OrderItem.create({
          //     orderId: order.id,
          //     productId: item.split(',')[0],
          //     size: item.split(',')[3],
          //     quantity: item.split(',')[4]
          //   });
          // });
        // } else {
          // console.log('one')
          // OrderItem.create({
          //   orderId: order.id,
          //   productId: products.split(',')[0],
          //   size: products.split(',')[3],
          //   quantity: products.split(',')[4]
          // });
        // }
      });
  } catch (e) {
    console.log(e);
  }
});


module.exports = router;