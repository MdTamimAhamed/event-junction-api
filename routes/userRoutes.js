const express = require("express");
const router = express.Router();
const { signupUser, loginUser } = require("../controller/userController");
const {
  userSignupValidators,
  userSignupValidatorsErrorHandler,
} = require("../validators/signupValidator");

const {
  userLoginValidators,
  userLoginValidatorErrorHandler,
} = require("../validators/loginValidator");

router.post(
  "/signup",
  userSignupValidators,
  userSignupValidatorsErrorHandler,
  signupUser
);
router.post(
  "/login",
  userLoginValidators,
  userLoginValidatorErrorHandler,
  loginUser
);

module.exports = router;
