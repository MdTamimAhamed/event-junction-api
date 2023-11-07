const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { EndUser, EndAdmin } = require("../model/userSchema");
const createError = require("http-errors");

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
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //new admin created
  const newAdmin = EndAdmin({
    ...req.body,
    password: hashPassword,
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

//-----------------

//@user-login
async function loginUser(req, res, next) {
  try {
    const isUserExist = await EndUser.findOne({ email: req.body.email });
    if (isUserExist && isUserExist._id) {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        isUserExist.password
      );
      if (isPasswordValid) {
        const userDetails = {
          firstName: isUserExist.firstName,
          lastName: isUserExist.lastName,
          email: isUserExist.email,
          _id: isUserExist._id,
          role: "Client",
        };

        //token generate
        const token = jwt.sign(userDetails, `${process.env.JWT_SECRATE}`, {
          expiresIn: "1h",
        });

        //send response
        res.status(200).json({
          message: "Login Successfull!",
          token,
        });
      } else {
        res.status(401).json({
          message: "Wrong password!",
        });
      }
    } else {
      res.status(404).json({
        message: "Please signup, no user found!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Unkown error occured! Try again...",
      details: err.message,
    });
  }
}

//@admin-login
async function loginAdmin(req, res, next) {
  try {
    const isAdminExist = await EndAdmin.findOne({ email: req.body.email });
    if (isAdminExist && isAdminExist._id) {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        isAdminExist.password
      );

      if (isPasswordValid) {
        const adminDetails = {
          firstName: isAdminExist.firstName,
          lastName: isAdminExist.lastName,
          email: isAdminExist.email,
          _id: isAdminExist._id,
          role: "Admin",
        };

        //token generate
        const token = jwt.sign(adminDetails, `${process.env.JWT_SECRATE}`, {
          expiresIn: "1h",
        });

        //send response
        res.status(200).json({
          message: "Admin login successfull!",
          token,
        });
      } else {
        res.status(401).json({
          message: "Wrong password!",
        });
      }
    } else {
      res.status(404).json({
        message: "Please signup, no admin found!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Unkown error occured! Try again...",
      details: err.message,
    });
  }
}

module.exports = {
  signupUser,
  signupAdmin,
  loginUser,
  loginAdmin,
};
