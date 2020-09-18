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
  const products = await Product.findAll({
    where: {
      categoryId: category.id
    }
  })

  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const outerProducts = {};
  outerProducts.pagesQuantity = Math.floor(products.length / limit) + 1;

  if (endIndex < products.length) {
    outerProducts.next = {
      page: page + 1,
      limit: limit
    }
  }

  if (startIndex > 0) {
    outerProducts.prev = {
      page: page - 1,
      limit: limit
    }
  }
  

  outerProducts.products = products.slice(startIndex, endIndex);
  // console.log(products.length);
  // console.log(req.query);
  // outerProducts.products.forEach(item => console.log(item.title));
  // console.log(outerProducts);


  const response = {};
  response.bucket = 'bloodborne-images';
  response.region = 'eu-central-1';


  res.render('category', {
    title: `${category.title}`,
    category,
    outerProducts,
    page,
    response
  });
});

module.exports = router;