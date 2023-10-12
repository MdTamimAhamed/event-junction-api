const express = require("express");
const router = express.Router();
const { signupAdmin, loginAdmin } = require("../controller/userController");
const {
  adminSignupValidators,
  adminSignupValidatorsErrorHandler,
} = require("../validators/signupValidator");

const {
  adminLoginValidators,
  adminLoginValidatorErrorHandler,
} = require("../validators/loginValidator");

router.post(
  "/signup",
  adminSignupValidators,
  adminSignupValidatorsErrorHandler,
  signupAdmin
);
router.post(
  "/login",
  adminLoginValidators,
  adminLoginValidatorErrorHandler,
  loginAdmin
);

module.exports = router;
