const { check, validationResult } = require("express-validator");
const { EndUser, EndAdmin } = require("../model/userSchema");
const createError = require("http-errors");

//user validation
const userSignupValidators = [
  check("firstName")
    .isLength({ min: 1 })
    .withMessage("Atleast 1 character required!")
    .trim(),

  check("lastName").trim(),
  check("email")
    .isEmail()
    .withMessage("Enter a valid email address!")
    .trim()
    .custom(async (email) => {
      try {
        const isEmailExist = await EndUser.findOne({ email: email });
        if (isEmailExist) {
          throw createError("Email already in use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters!"),

  check("confirmPass").custom(async (confirmPass, { req }) => {
    const mainPassword = req.body.password;
    if (confirmPass != mainPassword) {
      throw createError("Password did not matched!");
    }
  }),
];

function userSignupValidatorsErrorHandler(req, res, next) {
  const errors = validationResult(req);
  const mappedErr = errors.mapped();
  if (Object.keys(mappedErr).length === 0) {
    next();
  } else {
    console.log(mappedErr);
    res.status(500).json({
      errors: mappedErr,
    });
  }
}

//admin validation
const adminSignupValidators = [
  check("firstName")
    .isLength({ min: 1 })
    .withMessage("Atleast 1 chacracter required!")
    .trim(),
  check("lastName").trim(),
  check("email")
    .isEmail()
    .withMessage("Enter your DIU email")
    .trim()
    .custom(async (email) => {
      try {
        const isEmailExist = await EndAdmin.findOne({ email: email });
        if (isEmailExist) {
          throw createError("Email already in use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("accessToken")
    .isLength({ min: 6 })
    .withMessage("Enter 6 digit (xxx-xxx) access key!")
    .trim()
    .custom(async (token) => {
      try {
        const isTokenExist = await EndAdmin.findOne({ accessToken: token });
        if (isTokenExist) {
          throw createError("This access-token already registerd!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters!"),
  check("confirmPass").custom(async (confirmPass, { req }) => {
    const mainPassword = req.body.password;
    if (confirmPass != mainPassword) {
      throw createError("Password did not matched!");
    }
  }),
];

function adminSignupValidatorsErrorHandler(req, res, next) {
  const errors = validationResult(req);
  const mappedErr = errors.mapped();
  if (Object.keys(mappedErr).length === 0) {
    next();
  } else {
    console.log(mappedErr);
    res.status(500).json({
      errors: mappedErr,
    });
  }
}

module.exports = {
  userSignupValidators,
  userSignupValidatorsErrorHandler,
  adminSignupValidators,
  adminSignupValidatorsErrorHandler,
};
