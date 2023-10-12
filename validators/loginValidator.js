const { check, validationResult } = require("express-validator");

//user-login-validation
const userLoginValidators = [
  check("email").isEmail().withMessage("Enter a valid email.").trim(),
];

const userLoginValidatorErrorHandler = (req, res, next) => {
  const error = validationResult(req);
  const mappedErr = error.mapped();

  if (Object.keys(mappedErr).length === 0) {
    next();
  } else {
    res.status(500).json({
      errors: mappedErr,
    });
  }
};

//admin-login-validation
const adminLoginValidators = [
  check("email").isEmail().withMessage("Enter a valid email.").trim(),
];

const adminLoginValidatorErrorHandler = (req, res, next) => {
  const error = validationResult(req);
  const mappedErr = error.mapped();

  if (Object.keys(mappedErr).length === 0) {
    next();
  } else {
    res.status(500).json({
      errors: mappedErr,
    });
  }
};

module.exports = {
  userLoginValidators,
  userLoginValidatorErrorHandler,
  adminLoginValidators,
  adminLoginValidatorErrorHandler,
};
