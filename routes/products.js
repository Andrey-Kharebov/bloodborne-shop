const {Router} = require('express');
const router = Router();
const admin = require('../middleware/admin');
const Product = require('../models/product');
const Category = require('../models/category');

router.get('/:id', async (req, res) => {
  try {
    const user = req.session.user;
    const product = await Product.findByPk(req.params.id);
    res.render('product', {
      title: product.title,
      product,
      user
    });
  } catch (e) {
    console.log(e);
  }
});



module.exports = router;