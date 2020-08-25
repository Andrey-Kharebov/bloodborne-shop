const {Router} = require('express');
const router = Router();
const Product = require('../models/product');
const ProductImage = require('../models/product-image');

// fetch
router.get('/recommended/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  res.status(200).json(product);
})

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