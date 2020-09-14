const {Router} = require('express');
const router = Router();
const admin = require('../middleware/admin');
const User = require('../models/user');
const Order = require('../models/order');
const OrderItem = require('../models/order-item');
const Product = require('../models/product');
const Category = require('../models/category');
const ProductImage = require('../models/product-image');

// AWS
const aws = require('aws-sdk');
const keys = require('../keys');


function statusTranslate(item) {
  for (let key in item) {
    switch (item[key].status) {
      case 'new':
        return 'Новый'
        break;
      case 'processing':
        return 'Обработка'
        break;
      case 'ordered':
        return 'Заказано'
        break;
      case 'delivery':
        return 'Доставка'
        break;
      case 'completed':
        return 'Выполнен'
        break;
      case 'rejected':
        return 'Отменен'
        break;
    }
  }
}

function orderStatistic(user) {
  let statistic = {
    completedOrders: 0,
    rejectedOrders: 0,
    processingOrders: 0
  }
  for (let key in user.orders) {
    if (user.orders[key].status == 'completed') {
      statistic.completedOrders++;
    } else if (user.orders[key].status == 'rejected') {
      statistic.rejectedOrders++;
    } else {
      statistic.processingOrders++;
    }
  }
  return statistic;
}

// Fetch
router.get('/navsearch/:value', admin, async (req, res) => {
  const products = await Product.findAll({
    attributes: ['id', 'title', 'price']
  });
  const users = await User.findAll({
    attributes: ['id', 'name', 'surname', 'email', 'phone', 'town']
  })
  const orders = await Order.findAll({
    attributes: ['id', 'name', 'surname', 'phone', 'email', 'totalCost', 'status']
  })
  const searchResult = {
    products,
    users,
    orders
  }
  res.status(200).json(searchResult);
})
router.get('/navbell', admin, async (req, res) => {
  const newOrders = await Order.findAll({
    where: {
      status: 'new'
    }
  }); // для колокольчика
  res.status(200).json(newOrders);
})



router.get('/', admin, async (req, res) => {
  const user = req.user;
  const lastOrders = await req.user.adminLastOrders();
  const monthOrdersQuantity = await req.user.adminMonthOrdersQuantity();
  const monthUsersQuantity = await req.user.adminMonthUsersQuantity();
  const monthProfitSum = await req.user.adminProfitSum();


  res.render('admin-home', {
    layout: 'admin',
    title: 'Admin page',
    user,
    lastOrders,
    monthOrdersQuantity,
    monthUsersQuantity,
    monthProfitSum
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
  const user = req.user;
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
  const user = req.user;
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
  let rusStatus = statusTranslate(order);


  res.render('admin-order', {
    layout: 'admin',
    title: 'Admin order',
    user,
    order,
    rusStatus
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
    zipcode: req.body.zipcode,
    status: req.body.status
  });

  console.log(req.body);
  res.redirect(`/admin/order/${req.params.id}`);
});

router.post('/order/:id/remove', admin, async (req, res) => {
  const order = await Order.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: OrderItem
    }
  });

  order.destroy();
  res.redirect('/admin/orders');
});


router.post('/orderitem/:id', admin, async (req, res) => {
  let totalPrice = 0;
  let deliveryPrice = 0;
  let totalCost = 0;
  const order = await Order.findOne({
      where: {
        id: req.body.orderId
      },
      include: {
        model: OrderItem
      }
    })
    .then(async (order) => {
      for (let key in order.orderItems) {
        if (order.orderItems[key].id === +req.body.id) {
          const orderItem = await OrderItem.findOne({
            where: {
              id: req.body.id
            }
          })
          orderItem.update({
              size: req.body.size,
              quantity: req.body.quantity
            })
            .then(async () => {
              const updatedOrder = await Order.findOne({
                where: {
                  id: req.body.orderId
                },
                include: {
                  model: OrderItem
                }
              })
              return updatedOrder;
            })
            .then(async (order) => {
              for (let key in order.orderItems) {
                const product = await Product.findOne({
                  where: {
                    id: order.orderItems[key].productId
                  }
                })
                totalPrice += order.orderItems[key].quantity * product.price;
                deliveryPrice += ((5 / 100) * totalPrice);
                totalCost = (totalPrice + deliveryPrice);
                order.update({
                  totalPrice: totalPrice,
                  deliveryPrice: deliveryPrice,
                  totalCost: totalCost
                })
              }
            })
        }
      }
    })

  res.redirect(`/admin/order/${req.body.orderId}`);
});

router.get('/product/add', admin, async (req, res) => {
  const user = req.user;
  const categories = await Category.findAll();

  // const s3 = new aws.S3({
  //   accessKeyId: keys.AWSAccessKeyId,
  //   secretAccessKey: keys.AWSSecretKey,
  //   region: 'eu-central-1'
  // });
  
  // const response = await s3.listObjectsV2({
  //   Bucket: 'bloodborne-images'
  //   // Prefix: 'folder1'
  // }).promise();

  // console.log(response);
  res.render('admin-product-add', {
    layout: 'admin',
    title: 'Adding page',
    categories,
    user
  });
});

router.post('/product/add', admin, async (req, res) => {
  try {
    let recommended;
    if (req.body.recommended === 'on') {
      recommended = 1;
    }
    for (let key in req.files) {
      // console.log(req.files[key]);
      // console.log(req.files[key].path);
      console.log(req.files[key].key);
    }
    await Product.create({
        title: req.body.title,
        price: req.body.price,
        imageUrl: req.files[0].key,
        description: req.body.description,
        recommended: recommended,
        categoryId: req.body.categoryId
      })
      .then((product) => {
        for (let key in req.files) {
          ProductImage.create({
            productId: product.id,
            imageUrl: req.files[key].key
          });
        }
      })
    console.log(req.body);
    res.redirect('/admin');
  } catch (e) {
    console.log(e);
  }
});

router.get('/profile/:id', admin, async (req, res) => {
  const user = req.user;
  const userProfile = await User.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Order
    }
  });
  let orderStat = orderStatistic(userProfile);
  const userOrders = await user.adminFetchOrders(userProfile);

  res.render('admin-user-profile', {
    layout: 'admin',
    title: 'Admin user profile',
    user,
    userProfile,
    orderStat,
    userOrders
  });
});

router.post('/profile/:id', admin, async (req, res) => {
  const user = req.user;
  const userProfile = await User.findByPk(req.params.id);
  userProfile.update({
    name: req.body.name,
    surname: req.body.surname,
    patronymic: req.body.patronymic,
    phone: req.body.phone,
    country: req.body.country,
    town: req.body.town,
    region: req.body.region,
    address: req.body.address,
    zipcode: req.body.zipcode
  })
  res.redirect(`/admin/profile/${userProfile.id}`);
});

router.get('/product/:id/edit', admin, async (req, res) => {
  try {
    const user = req.user;
    const categories = await Category.findAll();
    const product = await Product.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: ProductImage
      }
    });
    let recommended;
    if (product.recommended === true) {
      recommended = 'checked'
    }
    const images = product.productImages;
    const category = await Category.findOne({
      where: {
        id: product.categoryId
      }
    });

    const response = {};
    response.bucket = 'bloodborne-images';
    response.region = 'eu-central-1';
    res.render('admin-product-edit', {
      layout: 'admin',
      title: `Редактировать '${product.title}'`,
      user,
      categories,
      category,
      images,
      product,
      recommended,
      response
    });
  } catch (e) {
    console.log(e);
  }
});

router.post('/product/:id/edit', admin, async (req, res) => {
  try {
    const user = req.user;
    const product = await Product.findOne({
      where: {
        id: req.body.id
      },
      include: {
        model: ProductImage
      }
    });
    let recommended;
    if (req.body.recommended === 'on') {
      recommended = 1;
    } else {
      recommended = 0;
    }
    if (req.files[0]) {
      const s3 = new aws.S3({
        accessKeyId: keys.AWSAccessKeyId,
        secretAccessKey: keys.AWSSecretKey,
        region: 'eu-central-1'
      });
      const params = {
        Bucket: 'bloodborne-images',
        Key: product.imageUrl
      }
      s3.deleteObject(params, function(err, data) {
        if (err) console.log(err, err.stack);  // error
        else     console.log();                 // deleted
      });

      product.update({
        title: req.body.title,
        price: req.body.price,
        recommended: recommended,
        categoryId: req.body.categoryId,
        imageUrl: req.files[0].key,
        description: req.body.description
      })
      .then(product => {
        product.productImages[0].update({
          imageUrl: req.files[0].key,
        });
      })
    } else {
      product.update({
        title: req.body.title,
        price: req.body.price,
        recommended: recommended,
        categoryId: req.body.categoryId,
        description: req.body.description
      });
    }
    product.save();
    res.redirect(`/admin/catalog`);
  } catch (e) {
    console.log(e);
  }
});

router.post('/product/add-img/add', admin, async (req, res) => {
  try {
    const user = req.user;
    const product = await Product.findOne({
      where: {
        id: req.body.id
      },
      include: {
        model: ProductImage
      }
    });
    await ProductImage.create({
      imageUrl: req.files[0].key,
      productId: req.body.id
    })
    res.redirect(`/admin/product/${req.body.id}/edit`);
  } catch (e) {
    console.log(e);
  }
});

router.post('/product/add-img/:id/edit', admin, async (req, res) => {
  try {
    const user = req.user;
    const productImage = await ProductImage.findByPk(req.params.id);
    const s3 = new aws.S3({
      accessKeyId: keys.AWSAccessKeyId,
      secretAccessKey: keys.AWSSecretKey,
      region: 'eu-central-1'
    });
    const params = {
      Bucket: 'bloodborne-images',
      Key: productImage.imageUrl
    }
    s3.deleteObject(params, function(err, data) {
      if (err) console.log(err, err.stack);  // error
      else     console.log();                 // deleted
    });
    productImage.update({
      imageUrl: req.files[0].key
    })
    productImage.save();
    res.redirect(`/admin/product/${productImage.productId}/edit`);
  } catch (e) {
    console.log(e);
  }
});

router.post('/product/:id/remove', admin, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    const productImages = await ProductImage.findAll({
      where: {
        productId: product.id
      }
    })

    product.destroy();
    productImages.forEach(item => {
      const s3 = new aws.S3({
        accessKeyId: keys.AWSAccessKeyId,
        secretAccessKey: keys.AWSSecretKey,
        region: 'eu-central-1'
      });
      const params = {
        Bucket: 'bloodborne-images',
        Key: item.imageUrl
      }
      s3.deleteObject(params, function(err, data) {
        if (err) console.log(err, err.stack);  // error
        else     console.log();                 // deleted
      });
      item.destroy()
    });
    res.redirect('/admin');
  } catch (e) {
    console.log(e);
  }
});

router.post('/product/add-img/:id/remove', admin, async (req, res) => {
  try {
    const user = req.user;
    const productImage = await ProductImage.findByPk(req.params.id);
    const s3 = new aws.S3({
      accessKeyId: keys.AWSAccessKeyId,
      secretAccessKey: keys.AWSSecretKey,
      region: 'eu-central-1'
    });
    const params = {
      Bucket: 'bloodborne-images',
      Key: productImage.imageUrl
    }
    s3.deleteObject(params, function(err, data) {
      if (err) console.log(err, err.stack);  // error
      else     console.log();                 // deleted
    });
    productImage.destroy();
    res.redirect(`/admin/product/${productImage.productId}/edit`);
  } catch (e) {
    console.log(e);
  }
});


module.exports = router;