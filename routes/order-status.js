const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('order-status', {
    title: 'Order status',
    isOrStatus: true
  });
});

module.exports = router;