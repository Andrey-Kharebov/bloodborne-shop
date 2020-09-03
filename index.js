const express = require('express');
const bcrypt = require('bcryptjs');
const csrf = require('csurf');
const flash = require('connect-flash');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
// const helmet = require('helmet');
const compression = require('compression');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const sequelize = require('./utils/database');
const path = require('path');
const bodyParser = require("body-parser");
const keys = require('./keys');

// AWS
const aws = require('aws-sdk');


// Middlewares
const fileMiddleware = require('./middleware/file');
const varMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/user');


// Routes
const categoriesRoutes = require('./routes/categories');
const homeRoutes = require('./routes/home');
const faqRoutes = require('./routes/faq');
const orderStatusRoutes = require('./routes/order-status');
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
const ProductImage = require('./models/product-image');


// Assossiations 
Category.hasMany(Product);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderItem);
Product.hasMany(ProductImage);

Order.belongsToMany(Product, {
  through: {
    model: OrderItem,
    unique: false
  }
});
Product.belongsToMany(Order, {
  through: {
    model: OrderItem,
    unique: false
  }
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
// const options = {
//   host: 'us-cdbr-east-02.cleardb.com',
//   port: 3306,
//   user: 'b1f00dbed9c6d1',
//   password: 'c9533d9e',
//   database: 'heroku_48211aba3860de9'
// };
const sessionStore = new MySQLStore(options);


app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, '')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: keys.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}));
app.use(csrf());
app.use(flash());
// app.use(helmet());
app.use(compression());
app.use(userMiddleware);
app.use(varMiddleware);
app.use(fileMiddleware.array('image')); // посмотреть еще раз после сессий

app.use('/', homeRoutes);
app.use('/categories', categoriesRoutes);
app.use('/faq', faqRoutes);
app.use('/order-status', orderStatusRoutes);
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
      await Category.create({ title: 'accessories'});
    }

    app.listen(PORT, () => {
      console.log(`Server  is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();

 