const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('categories/outerwear', {
    title: 'Outerwear',
    isOuterwear: true
  });
});

module.exports = router;