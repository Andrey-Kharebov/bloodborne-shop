const {
  Router
} = require('express');
const router = Router();
const OrderItem = require('../models/order-item');
const Order = require('../models/order');
const User = require('../models/user');



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
router.post('/:id/step2', async (req, res) => {
  try {
    let userId;
    if (req.session.user) {
      userId = req.session.user.id;
    }
    let products = req.body.products;
    // console.log(JSON.stringify(req.body.products));
    // console.log(JSON.stringify(req.body.products).length);
    // console.log(JSON.stringify(req.body.products).match(/,/g).length); // >6

    // products.forEach(item => {
    //   let size = item.split(',')[3];
    //   console.log(item.split(',')[0].replace(size, ''));
    // });

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
        if (JSON.stringify(req.body.products).match(/,/g).length <= 6) {
          OrderItem.create({
            orderId: order.id,
            productId: products.split(',')[0],
            title: products.split(',')[1],
            size: products.split(',')[3],
            quantity: products.split(',')[4]
          });
        } else {
          products.forEach(async item => {
            let size = item.split(',')[3];
            // console.log(order.id);
            // console.log(item.split(',')[0].replace(size, ''));
            // console.log(item);

            OrderItem.create({
              orderId: order.id,
              productId: item.split(',')[0].replace(size, ''),
              title: item.split(',')[1],
              size: item.split(',')[3],
              quantity: item.split(',')[4]
            })
            .catch((err) => {
              console.log(err);
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