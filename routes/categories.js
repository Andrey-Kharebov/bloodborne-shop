const {Router} = require('express');
const router = Router();
const Product = require('../models/product');
const Category = require('../models/category');

router.get('/:title', async (req, res) => {
  const category = await Category.findOne({
    where: {
      title: req.params.title
    },
    include: {
      model: Product
    }
  });
  const products = category.products;
  // console.log(products);
  res.render('category', {
    title: `${category.title}`,
    category,
    products
  });
});

module.exports = router;