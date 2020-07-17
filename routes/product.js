const {Router} = require('express');
const router = Router();
const Product = require('../models/product');

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    console.log(product);
    res.render('product', {
      title: product.title,
      product
    });
  } catch (e) {
    console.log(e);
  }
});


module.exports = router;