const {Router} = require('express');
const router = Router();
const Product = require('../models/product');
const ProductImage = require('../models/product-image');

router.get('/:id', async (req, res) => {
  try {
    const user = req.session.user;
    const product = await Product.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: ProductImage
      }
    });
    const recommended = await Product.findAll({
      where: {
        recommended: 1
      }
    })
    const images = product.productImages
    res.render('product', {
      title: product.title,
      product,
      images,
      user,
      recommended
    });
  } catch (e) {
    console.log(e);
  }
});



module.exports = router;