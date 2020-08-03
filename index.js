const express = require('express');
const bcrypt = require('bcryptjs');
const csrf = require('csurf');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const sequelize = require('./utils/database');
const path = require('path');


// Middlewares
const fileMiddleware = require('./middleware/file');
const varMiddleware = require('./middleware/variables');


// Routes
const categoriesRoutes = require('./routes/categories');
const homeRoutes = require('./routes/home');
const faqRoutes = require('./routes/faq');
const orderStatusRoutes = require('./routes/order-status');
const addRoutes = require('./routes/add');
const productRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');


// Models
const User = require('./models/user');
const Category = require('./models/category');
const Product = require('./models/product');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');


// Assossiations 
Category.hasMany(Product);

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, {
  through: OrderItem
});
Product.belongsToMany(Order, {
  through: OrderItem
});


const app = express();
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
});
const options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'a4563210',
  database: 'bloodborne'
};
const sessionStore = new MySQLStore(options);


app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, '')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: 'some secret value',
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}));
app.use(csrf());
app.use(varMiddleware);
app.use(fileMiddleware.single('image')); // посмотреть еще раз после сессий

app.use('/', homeRoutes);
app.use('/categories', categoriesRoutes);
app.use('/faq', faqRoutes);
app.use('/order-status', orderStatusRoutes);
app.use('/add', addRoutes);
app.use('/products', productRoutes);
app.use('/order', ordersRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);




const PORT = process.env.PORT || 3000;
async function start() {
  try {
    await sequelize.sync();

    const user = await User.findByPk('1');
    if (!user) {
      const hashPassword = await bcrypt.hash('123456', 10);
      await User.create({
        email: 'admin@bb.com',
        password: hashPassword,
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

 