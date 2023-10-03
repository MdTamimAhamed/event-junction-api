const mongoose = require("mongoose");

const accessTokenSchema = mongoose.Schema({
  accessToken: {
    type: String,
    unique: true,
    require: true,
  },
});

const adminKeys = mongoose.model("Club-admin-keys", accessTokenSchema);
module.exports = adminKeys;
