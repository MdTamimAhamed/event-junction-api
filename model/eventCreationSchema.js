const express = require("express");
const mongoose = require("mongoose");

const eventCreationSchema = mongoose.Schema({
  eventTitle: {
    type: String,
    require: true,
  },
  eventThumbnail: {
    type: String,
    require: true,
  },
  eventType: {
    type: String,
    require: true,
  },
  swagItems: {
    type: [String],
  },
  dates: {
    type: [String],
    require: true,
  },
  times: {
    type: [String],
    require: true,
  },
  venue: {
    type: String,
    require: true,
  },
  speaker: {
    type: String,
    require: true,
  },
});

const EndEvent = mongoose.model("EventDetail", eventCreationSchema);
module.exports = { EndEvent };
