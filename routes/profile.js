const {Router} = require('express');
const auth = require('../middleware/auth');
const User = require('../models/user');
const router = Router();

router.get('/:id', auth, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.render('profile', {
    title: 'Profile',
    isMyProfile: true,
    user
  });
});

router.get('/:id/orders', auth, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.render('profile-orders', {
    title: 'My orders',
    isMyOrders: true,
    user
  });
});

router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    const toChange = {
      name: req.body.name
    };

    console.log(req.file);

    if (req.file) {
      toChange.avatarUrl = req.file.path;
    }

    Object.assign(user, toChange);
    await user.save();
    res.redirect('/profile');
  } catch (e) {
   console.log(e); 
  }
});

module.exports = router;