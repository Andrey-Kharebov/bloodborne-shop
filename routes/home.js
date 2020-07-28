const {Router} = require('express');
const router = Router();

router.get('/', async (req, res) => {
  console.log(req.user);
  res.render('index', {
    title: 'Bloodborne shop'
  });
});

module.exports = router;