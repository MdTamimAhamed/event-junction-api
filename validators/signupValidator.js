const { check, validationResult } = require("express-validator");
const EndUser = require("../model/userSchema");
const createError = require("http-errors");

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

module.exports = {
  userSignupValidators,
  userSignupValidatorsErrorHandler,
};
