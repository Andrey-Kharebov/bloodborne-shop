const {Router} = require('express');
const router = Router();

router.get('/:id', (req, res) => {
  res.render('admin-home', {
    layout: 'admin',
    title: 'Admin page'
  });
});

router.get('/:id/users', (req, res) => {
  res.render('admin-users', {
    layout: 'admin',
    title: 'Admin users'
  });
});

router.get('/:id/orders', (req, res) => {
  res.render('admin-orders', {
    layout: 'admin',
    title: 'Admin orders'
  });
});

router.get('/:id/catalog', (req, res) => {
  res.render('admin-catalog', {
    layout: 'admin',
    title: 'Admin orders'
  });
});


module.exports = router;