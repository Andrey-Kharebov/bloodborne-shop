const {Router} = require('express');
const router = Router();

router.post('/:id/details', async (req, res) => {
  console.log(req.body.id);
  res.render('order-details', {
    title: 'Bloodborne shop'
  });
});

module.exports = router;