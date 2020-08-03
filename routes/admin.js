const {Router} = require('express');
const router = Router();
const admin = require('../middleware/admin');


router.get('/:id', admin, (req, res) => {
  res.render('admin-home', {
    layout: 'admin',
    title: 'Admin page'
  });
});

router.get('/:id/users', admin, (req, res) => {
  res.render('admin-users', {
    layout: 'admin',
    title: 'Admin users'
  });
});

router.get('/:id/orders', admin, (req, res) => {
  res.render('admin-orders', {
    layout: 'admin',
    title: 'Admin orders'
  });
});

router.get('/:id/catalog', admin, (req, res) => {
  res.render('admin-catalog', {
    layout: 'admin',
    title: 'Admin orders'
  });
});


module.exports = router;