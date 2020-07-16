const {Router} = require('express');
const router = Router();
const Product = require('../models/product');
const Category = require('../models/category');

router.get('/', async (req, res) => {
  const categories = await Category.findAll();
  res.render('add', {
    layout: 'admin',
    title: 'Adding page',
    categories
  });
});

router.post('/', async (req, res) => {
  try {
    await Product.create({
      title: req.body.title,
      price: req.body.price,
      imageUrl: req.file.path,
      description: req.body.description,
      categoryId: req.body.categoryId
    });

    console.log(req.file);
    console.log(req.body);

    res.redirect('/add');
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;