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
    min: 50,
    max: 1000000
  },
  tip: {
    type: Number,
    required: false,
    default: 0
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