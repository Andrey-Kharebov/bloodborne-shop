const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('faq', {
    title: 'FAQ',
    isFAQ: true
  });
});

module.exports = router;