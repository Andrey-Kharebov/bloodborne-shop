const {Router} = require('express');
const router = Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');


router.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    const {email, password} = req.body;
    const candidate = await User.findOne({
      where: {
        email: email
      }
    });

    if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password);

      if (areSame) {
        req.session.user = candidate;
        req.session.isAuthenticated = true;
        req.session.save(err => {
          if (err) {
            throw err;
          }
        });
        res.redirect(`/profile`);
        
        console.log('good job');
      } else {
        res.redirect('/');
        console.log('wrong password');
      }
    } else {
      res.redirect('/');
      console.log('wrong email');
    }

  } catch (e) {
   console.log(e); 
  }
});

router.get('/logout', async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

router.post('/register', async (req, res) => {
  try {
    console.log(req.body);
    const {email, password, confirm} = req.body; 

    const candidate = await User.findOne({
      where: {
        email: email
      }
    });

    if (candidate) {
      // req.flash('message', 'Пользователь с таким e-mail уже существует');
      // req.flash('error', 'Пользователь с таким e-mail уже существует');
      // req.flash('info', 'Пользователь с таким e-mail уже существует');
      // req.flash('success', 'Пользователь с таким e-mail уже существует');
      // req.flash('warning', 'Пользователь с таким e-mail уже существует');

      res.redirect('/');
      // console.log(req.flash('error'));
      // console.log(req.flash('info'));
      // console.log(req.flash('success'));
      // console.log(req.flash('warning'));
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email, password: hashPassword
      });
      res.redirect('/');
      console.log('novii');
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;