const {Router} = require('express');
const router = Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const sendgrid = require('nodemailer-sendgrid-transport');
const keys = require('../keys');
const regEmail = require('../emails/registration');
const resetEmail = require('../emails/reset');
const crypto = require('crypto');
const {Op} = require('sequelize');

const transporter = nodemailer.createTransport(sendgrid({
  auth: {
    api_key: keys.SENDGRID_API_KEY
  }
}))

router.post('/login', async (req, res) => {
  try {
    // для req.body нужно добавить:
    // 1) npm i body-parser
    // в index.js
    // 2) const bodyParser = require("body-parser");
    // 3) app.use(bodyParser.urlencoded({ extended: false }));
    //    app.use(bodyParser.json());

    const {email, password} = req.body;
    const candidate = await User.findOne({
      where: {
        email: email
      }
    });

    if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password);

      if (areSame) {
        if (req.body.remember) {
          req.session.user = candidate;
          req.session.isAuthenticated = true;
          req.session.cookie.originalMaxAge = 31 * 24 * 60 * 60 * 1000;
          req.session.save(err => {
            if (err) {
              throw err;
            }
          });
          res.status(200).json('logged in');
        } else {
          req.session.user = candidate;
          req.session.isAuthenticated = true;
          req.session.save(err => {
            if (err) {
              throw err;
            }
          });
          res.status(200).json('logged in');
        }
      } else {
        res.status(200).json('wrong password');
      }
    } else {
      res.status(200).json('wrong email');
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
    const {
      email,
      password,
      confirm
    } = req.body;

    const candidate = await User.findOne({
      where: {
        email: email
      }
    });

    if (candidate) {
      res.redirect('/');
    } else {
      // Moscow time
      let offset = +3;
      let date = new Date(new Date().getTime() + offset * 3600 * 1000);

      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        password: hashPassword,
        createdAt: date,
        updatedAt: date
      });
      res.redirect('/');
      await transporter.sendMail(regEmail(email))
    }
  } catch (e) {
    console.log(e);
  }
});

router.post('/reset', (req, res) => {
  try {
    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        console.log('error', 'Something went wrong... Try again later');
        // req.flash('error', 'Something went wrong... Try again later');
        return res.redirect('/');
      }

      const token = buffer.toString('hex');

      const candidate = await User.findOne({
        where: {
          email: req.body.email
        }
      });

      if (candidate) {
        candidate.resetToken = token;
        candidate.resetTokenExp = Date.now() + 60 * 60 * 1000;
        await candidate.save();
        await transporter.sendMail(resetEmail(candidate.email, token));
        res.redirect('/');
      } else {
        console.log('error', 'Something went wrong... Try again later');
        // req.flash('error', 'There is no user with such an email here');
        res.redirect('/');
      }
    });
  } catch (e) {
    console.log(e);
  }
});

router.get('/password/:token', async (req, res) => {
  if (!req.params.token) {
    return res.redirect('/');
  }

  try {
    const user = await User.findOne({
      where: {
        resetToken: req.params.token,
        resetTokenExp: {
          [Op.gte]: Date.now()
        }
      }
    });

    if (!user) {
      console.log('loginError', 'Something went wrong!');
      return res.redirect('/');
    } else {
      res.render('auth/password', {
        title: 'New password',
        userId: user.id,
        token: req.params.token
      });
    }
  } catch (e) {
    console.log(e);
  }
});

router.post('/password', async (req, res) => {
  try {
    const candidate = await User.findOne({
      where: {
        id: req.body.userId,
        resetToken: req.body.token,
        resetTokenExp: {
          [Op.gte]: Date.now()
        }
      }
    });

    let password = await bcrypt.hash(req.body.password, 10);

    if (candidate) {
      candidate.update({
        password: password,
        resetToken: null,
        resetTokenExp: null
      });
      res.redirect('/');
    } else {
      console.log('loginError', 'The token lifetime expired. Try again');
      // req.flash('loginError', 'The token lifetime expired. Try again');
      res.redirect('/');
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;