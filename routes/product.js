const {Router} = require('express');
const router = Router();
const Product = require('../models/product');
const Category = require('../models/category');

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    // console.log(product);
    res.render('product', {
      title: product.title,
      product
    });
  } catch (e) {
    console.log(e);
  }
});

router.get('/:id/edit', async (req, res) => {
  try {
    const categories = await Category.findAll();
    const product = await Product.findByPk(req.params.id);
    const category = await Category.findOne({
      where: {
        id: product.categoryId
      }
    });
    if (!req.query.allow) {
      return res.redirect('/');
    }
    res.render('product-edit', {
      layout: 'admin',
      title: `Редактировать '${product.title}'`,
      categories,
      category,
      product
    });
  } catch (e) {
    console.log(e);
  }
});

router.post('/edit', async (req, res) => {
  try {
    const product = await Product.findByPk(req.body.id);
    
    if (req.file) {
      product.update({
        title: req.body.title,
        price: req.body.price,
        categoryId: req.body.categoryId,
        imageUrl: req.file.path,
        description: req.body.description
      });
    } else {
      product.update({
        title: req.body.title,
        price: req.body.price,
        categoryId: req.body.categoryId,
        description: req.body.description
      });
    }
    product.save();
    res.redirect(`/product/${product.id}`);
  } catch (e) {
    console.log(e);
  }
});


module.exports = router;