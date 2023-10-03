const express = require("express");
const router = express.Router();
const { signupAdmin } = require("../controller/userController");
const {
  adminSignupValidators,
  adminSignupValidatorsErrorHandler,
} = require("../validators/signupValidator");

router.post(
  "/admin-signup",
  adminSignupValidators,
  adminSignupValidatorsErrorHandler,
  signupAdmin
);
router.post("/admin-login");

module.exports = router;
