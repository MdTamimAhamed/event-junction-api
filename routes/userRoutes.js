const express = require("express");
const router = express.Router();
const { signupUser } = require("../controller/userController");
const {
  userSignupValidators,
  userSignupValidatorsErrorHandler,
} = require("../validators/signupValidator");

router.post(
  "/signup",
  userSignupValidators,
  userSignupValidatorsErrorHandler,
  signupUser
);
router.post("/login");

module.exports = router;
