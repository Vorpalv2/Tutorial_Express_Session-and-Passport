import "dotenv/config";
import express from "express";
import { mainRoutes } from "./Routes/main.routes.js";
import { connectToDB } from "./DBConnect.mongoDB.js";
import session from "express-session";
import passport from "passport";
import { userModel } from "./schema/user.schema.js";

const app = express();

app.set("view engine", "ejs");

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "thisisTheSecretString",
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(userModel.createStrategy());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", mainRoutes);

(() => {
  connectToDB(process.env.URI)
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log(`Server is online on PORT ${process.env.PORT}`);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
})();
