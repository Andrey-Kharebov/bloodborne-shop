const express = require('express');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const path = require('path');


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


app.get('/', (req, res) => {
  res.render('index');
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server  is running on port ${PORT}`);
});