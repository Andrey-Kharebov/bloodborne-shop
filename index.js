const express = require('express');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const sequelize = require('./utils/database');
const path = require('path');

// Routes
const homeRoutes = require('./routes/home');
const faqRoutes = require('./routes/faq');
const orderStatusRoutes = require('./routes/order-status');
const weapons = require('./routes/categories/weapons');
const hats = require('./routes/categories/hats');
const outerwear = require('./routes/categories/outerwear');
const gloves = require('./routes/categories/gloves');
const pants = require('./routes/categories/pants');



const app = express();
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');




app.use(express.static(path.join(__dirname, '')));
app.use('/', homeRoutes);
app.use('/faq', faqRoutes);
app.use('/order-status', orderStatusRoutes);
app.use('/weapons', weapons);
app.use('/hats', hats);
app.use('/outerwear', outerwear);
app.use('/gloves', gloves);
app.use('/pants', pants);





const PORT = process.env.PORT || 3000;
async function start() {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server  is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();

