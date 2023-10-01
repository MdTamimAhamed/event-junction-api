const express = require("express");
const bcrypt = require("bcrypt");
const EndUser = require("../model/userSchema");

async function signupUser(req, res, next) {
  const salt = await bcrypt.genSalt(10);
  const hashPasswrod = await bcrypt.hash(req.body.password, salt); //pass hash

  //new user created
  const newUser = EndUser({
    ...req.body,
    password: hashPasswrod,
  });

  try {
    const result = await newUser.save();
    console.log(result);
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
};
