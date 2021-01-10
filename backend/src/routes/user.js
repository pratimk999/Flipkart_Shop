const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {
  isReqValidated,
  // validateSignin,
  validateSigninUser,
  validateSignupUser,
} = require("../validator/validate");
const { userMiddleWare } = require("../middlewares");

//!NOTE SIGNIN ROUTE
router.post(
  "/signin",
  validateSigninUser,
  isReqValidated,
  // passport.authenticate("local"),
  (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        console.log(err);
        return;
      }
      if (user) {
        if (user.authenticate(req.body.password) && user.role === "user") {
          const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );
          // console.log(token);
          const {
            _id,
            firstName,
            lastName,
            username,
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
              username,
              email,
              role,
              contactNumber,
              fullName,
            },
          });
        } else {
          return res.status(400).json({ message: "something went wrong" });
        }
      }
    });
  }
);

//!NOTE SIGNUP ROUTE
router.post("/signup", validateSignupUser, isReqValidated, async (req, res) => {
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err) console.log(err);
    if (user) {
      return res.json({ message: "user exists" });
    } else {
      try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const username = `@${firstName}`;
        const password = req.body.password;
        const contactNumber = req.body.mobileNumber;

        const _user = {
          firstName,
          lastName,
          email,
          username,
          contactNumber,
          password,
        };
        const newUser = await new User(_user);

        newUser.save((err, response) => {
          if (err) {
            return res.json({ error: err });
          }

          res.json({ user: newUser });
        });
      } catch (error) {
        console.log(error);
      }
    }
  });
});

//!NOTE LOGOUT ROUTE

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...See you later!",
  });
});

module.exports = router;
