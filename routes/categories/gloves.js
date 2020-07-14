const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('categories/gloves', {
    title: 'Gloves',
    isGloves: true
  });
});

module.exports = router;