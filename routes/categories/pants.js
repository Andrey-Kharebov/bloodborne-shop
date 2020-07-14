const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('categories/pants', {
    title: 'Pants',
    isPants: true
  });
});

module.exports = router;