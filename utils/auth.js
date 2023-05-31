const auth = (req, res, next) => {
    if (!req.session.LoggedIn) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = auth;