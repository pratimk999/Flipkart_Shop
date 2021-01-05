const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {
  isReqValidated,
  validateSignup,
  validateSignin,
} = require("../validator/validate");
const { userMiddleWare } = require("../middlewares");

//!NOTE SIGNIN ROUTE
router.post(
  "/signin",
  validateSignin,
  isReqValidated,
  userMiddleWare,
  // passport.authenticate("local"),
  (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) {
        console.log(err);
        return;
      }
      if (user) {
        if (user.authenticate(req.body.password)) {
          const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
          );
          console.log(token);
          const {
            _id,
            firstName,
            lastName,
            email,
            role,
            contactNumber,
            fullName,
          } = user;
          res.json({
            token: token,
            User: {
              _id,
              firstName,
              lastName,
              email,
              role,
              contactNumber,
              fullName,
            },
          });
        }
      }
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
          password,
        });
        const newUser = await new User(_user);

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
