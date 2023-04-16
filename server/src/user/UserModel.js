const mongoose = require("mongoose");
const user = new mongoose.Schema({
  lastName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 8
  },
  email: {
    type: String,
    required: true,
    minlength: 5
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 30
  },
  image: {
    type: String
  }
});

module.exports = mongoose.model("User", user);