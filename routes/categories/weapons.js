const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('categories/weapons', {
    title: 'Weapons',
    isWeapons: true
  });
});

module.exports = router;