const {Router} = require('express');
const router = Router();
const Product = require('../models/product');
const Category = require('../models/category');
const ProductImage = require('../models/product-image');

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

  const response = {};
  response.bucket = 'bloodborne-images';
  response.region = 'eu-central-1';


  console.log(products);
  res.render('category', {
    title: `${category.title}`,
    category,
    products,
    response
  });
});

module.exports = router;