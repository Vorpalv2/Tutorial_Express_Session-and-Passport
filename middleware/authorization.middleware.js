function checkForAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    console.log("not authorized");
    next();
  } else {
    console.log("authorized");
    next();
  }
}

export { checkForAuth };
