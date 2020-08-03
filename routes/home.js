const {Router} = require('express');
const router = Router();

router.get('/', async (req, res) => {
  res.render('index', {
    title: 'Bloodborne shop'
  });
});

module.exports = router;