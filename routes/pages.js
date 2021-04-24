const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

router.get("/", authController.isLoggedIn, (req, res) => {
  //   res.send("<h1>HELLO WORLD</h1>");
  res.render("index", {
    user: req.user,
  });
});

router.get("/register", (req, res) => {
  //   res.send("<h1>HELLO WORLD</h1>");
  res.render("register");
});

router.get("/login", (req, res) => {
  //   res.send("<h1>HELLO WORLD</h1>");
  res.render("login");
});

router.get("/profile", authController.isLoggedIn, (req, res) => {
  if (req.user)
    res.render("profile", {
      user: req.user,
      firstName: req.user.name.split(" ")[0],
    });
  else res.redirect("/login");
});

module.exports = router;
