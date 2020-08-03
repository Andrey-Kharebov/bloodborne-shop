module.exports = function(req, res, next) {

  if (!req.session.isAuthenticated || req.session.user.admin != true) {
    return res.redirect('/');
  }

  next();
};