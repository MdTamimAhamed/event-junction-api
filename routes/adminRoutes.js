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

const {
  uploadToStorage,
  handleUploadedFile,
  getEventDetails,
} = require("../controller/eventController");

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

router.post(
  "/add-event",
  uploadToStorage.single("thumbnail"),
  handleUploadedFile
);

router.get("/get-event", getEventDetails);

module.exports = router;
