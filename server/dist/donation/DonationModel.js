const mongoose = require("mongoose");
const donation = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  fundraiser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fundraiser",
    required: true
  },
  amount: {
    type: Number,
    required: true,
    minlength: 1000000,
    maxlength: 50
  },
  tip: {
    type: Number,
    required: false,
    default: 0,
    minlength: 1000000,
    maxlength: 50
  },
  incognito: {
    type: Boolean,
    required: true,
    default: false
  },
  message: {
    type: String,
    required: false,
    maxlength: 150
  }
}, {
  timestamps: true
});
module.exports = mongoose.model("Donation", donation);