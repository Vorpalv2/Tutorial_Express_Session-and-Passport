import { Router } from "express";
import { userModel } from "../schema/user.schema.js";
import passport from "passport";
import { checkForAuth } from "../middleware/authorization.middleware.js";

const mainRoutes = Router();

mainRoutes.get(`/`, (req, res) => {
  res.render("homepage");
});

mainRoutes.get(`/login`, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("login");
});

mainRoutes.get(`/register`, (req, res) => {
  res.render("register");
});

mainRoutes.get(`/secrets`, (req, res) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.render("secrets", { secret: "TF is going on" });
  } else {
    res.redirect(`/`);
  }
});

//Post Requests//

mainRoutes.post("/register", async (req, res) => {
  const newUser = await new userModel({
    username: req.body.username,
    password: req.body.password,
  });
  userModel.register(
    { username: newUser.username },
    newUser.password,
    (err, User) => {
      if (err) {
        console.log(err);
      }
      passport.authenticate("local", {
        successRedirect: "/secrets",
        failureRedirect: "/register",
      })(req, res);
    }
  );
});

mainRoutes.post(`/login`, (req, res) => {
  const user = new userModel({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
    }
    passport.authenticate("local", {
      successRedirect: "/secrets",
      failureRedirect: "/",
    })(req, res);
  });
});

mainRoutes.get(`/logout`, (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
  });
  res.redirect(`/`);
});

export { mainRoutes };
