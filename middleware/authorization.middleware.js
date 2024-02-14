function checkForAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect(`/`);
  } else {
    next();
  }
}

export { checkForAuth };