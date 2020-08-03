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
        res.redirect(`/profile/${candidate.id}`);
        
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
      res.redirect('/');
      console.log('est');
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