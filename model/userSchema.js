const express = require("express");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  confirmPass: {
    type: String,
    require: true,
  },
  accessToken: {
    type: String,
  },
});

const EndUser = mongoose.model("User", userSchema);

module.exports = EndUser;