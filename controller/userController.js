const express = require("express");
const bcrypt = require("bcrypt");
const { EndUser, EndAdmin } = require("../model/userSchema");

//@user signup
async function signupUser(req, res, next) {
  const salt = await bcrypt.genSalt(10);
  const hashPasswrod = await bcrypt.hash(req.body.password, salt); //pass hash
  const hashConfirmPass = await bcrypt.hash(req.body.confirmPass, salt);

  //new user created
  const newUser = EndUser({
    ...req.body,
    password: hashPasswrod,
    confirmPass: hashConfirmPass,
  });

  try {
    await newUser.save();
    res.status(200).json({
      message: "Signup successfull!",
    });
  } catch (err) {
    res.status(500).json({
      error: {
        message: "Unknown error occured! Try again...",
        details: err.details,
      },
    });
  }
}

//@admin signup
async function signupAdmin(req, res, next) {
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const hashConfirmPass = await bcrypt.hash(req.body.confirmPass, 10);
  const hashAccessToken = await bcrypt.hash(req.body.accessToken, 8);

  //new admin created
  const newAdmin = EndAdmin({
    ...req.body,
    password: hashPassword,
    confirmPass: hashConfirmPass,
    accessToken: hashAccessToken,
  });

  try {
    await newAdmin.save();
    res.status(200).json({
      message: "Signup successfull!",
    });
  } catch (err) {
    res.status(500).json({
      error: {
        message: "Unknown error occured! Try again...",
        details: err.details,
      },
    });
  }
}

module.exports = {
  signupUser,
  signupAdmin,
};
