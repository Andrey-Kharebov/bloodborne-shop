module.exports = function(req, res, next) {

  if (req.session.isAuthenticated && req.session.user.admin === true) {
    res.locals.isAdmin = req.session.isAuthenticated;
  } else {
    res.locals.isAuth = req.session.isAuthenticated;
  }
  res.locals.csrf = req.csrfToken();
  next();
};
