const { check, validationResult } = require("express-validator");

exports.validateSignup = [
  check("firstName").notEmpty().withMessage("First name is required"),
  check("lastName").notEmpty().withMessage("Last name is required"),
  check("email").isEmail().withMessage("Valid email is required"),
  check("username").notEmpty().withMessage("unique user name is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password with minimum length 6 is required"),
  check("contactNumber")
    .notEmpty()
    .withMessage("valid contact number is required"),
];

exports.validateSignupUser = [
  check("firstName").notEmpty().withMessage("First name is required"),
  check("lastName").notEmpty().withMessage("Last name is required"),
  check("email").isEmail().withMessage("Valid email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password with minimum length 6 is required"),
  check("mobileNumber")
    .notEmpty()
    .withMessage("valid contact number is required"),
];

exports.validateSignin = [
  check("username").notEmpty().withMessage("unique user name is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password with minimum length 6 is required"),
];

exports.validateSigninUser = [
  check("email").isEmail().withMessage("Valid email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password with minimum length 6 is required"),
];

exports.isReqValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.send(errors.array()[0].msg);
  }
  next();
};
