module.exports = function(req, res, next) {

  if (req.session.isAuthenticated && req.session.user.admin === true) {
    res.locals.isAdmin = req.session.isAuthenticated;
  } else {
    res.locals.isAuth = req.session.isAuthenticated;
  }
  res.locals.csrf = req.csrfToken();

  // res.locals.alert_message = req.flash('message');
  // res.locals.alert_error = req.flash('error');
  // res.locals.alert_info = req.flash('info');
  // res.locals.alert_success = req.flash('success');
  // res.locals.alert_warning = req.flash('warning');

  next();
};
