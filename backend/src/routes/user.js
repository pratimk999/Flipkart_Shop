const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const {
  isReqValidated,
  validateSignup,
  // validateSignin,
} = require("../validator/validate");

//!NOTE SIGNIN ROUTE
router.post(
  "/signin",
  // validateSignin,
  // isReqValidated,
  passport.authenticate("local"),
  (req, res) => {
    User.find({ username: req.body.username }, (err, user) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(req.session);
      const { _id, firstName, lastName, email, role, contactNumber } = req.user;
      res.json({
        User: { _id, firstName, lastName, email, role, contactNumber },
      });
      console.log(req.user);
    });
  }
);

//!NOTE SIGNUP ROUTE
router.post("/signup", validateSignup, isReqValidated, async (req, res) => {
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err) console.log(err);
    if (user) {
      return res.json({ message: "user exists" });
    } else {
      try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const contactNumber = req.body.contactNumber;

        const _user = new User({
          firstName,
          lastName,
          email,
          username,
          contactNumber,
        });
        const newUser = await User.register(_user, password);

        newUser.save((err, response) => {
          if (err) {
            return console.log(err);
          }
          res.json({ message: "user created" });
        });
      } catch (error) {
        console.log(error);
      }
    }
  });
});

//!NOTE LOGOUT ROUTE

router.get("/logout", (req, res) => {
  req.logOut();
  res.json({ message: "See you later" });
});

module.exports = router;
