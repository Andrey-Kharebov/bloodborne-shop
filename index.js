const express = require('express');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const sequelize = require('./utils/database');
const path = require('path');

// Routes
const categoriesRoutes = require('./routes/categories');
const homeRoutes = require('./routes/home');
const faqRoutes = require('./routes/faq');
const orderStatusRoutes = require('./routes/order-status');


// Models
const User = require('./models/user');
const Category = require('./models/category');




const app = express();
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(async (req, res, next) => {
  try {
    const user = await User.findByPk('1');
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
  }
});

app.use(express.static(path.join(__dirname, '')));
app.use(express.urlencoded({extended: true}));
app.use('/', homeRoutes);
app.use('/categories', categoriesRoutes);
app.use('/faq', faqRoutes);
app.use('/order-status', orderStatusRoutes);





const PORT = process.env.PORT || 3000;
async function start() {
  try {
    await sequelize.sync();

    const candidate = await User.findByPk('1');
    if (!candidate) {
      const user = await User.create({
        name: 'Admin',
        email: 'admin@bloodborne.com',
        password: '123456',
        admin: true
      });
    }

    const category = await Category.findByPk('1');
    if (!category) {
      await Category.create({ title: 'weapons'});
      await Category.create({ title: 'hats'});
      await Category.create({ title: 'outerwear'});
      await Category.create({ title: 'gloves'});
      await Category.create({ title: 'pants'});
    }

    app.listen(PORT, () => {
      console.log(`Server  is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();

