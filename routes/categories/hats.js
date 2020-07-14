const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('categories/hats', {
    title: 'Hats',
    isHats: true
  });
});

module.exports = router;