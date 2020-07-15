const {Router} = require('express');
const router = Router();
const Category = require('../models/category');

router.get('/:title', async (req, res) => {
  const category = await Category.findOne({
    where: {
      title: req.params.title
    }
  });
  res.render('category', {
    title: `${category.title}`,
    category
  });
});

module.exports = router;