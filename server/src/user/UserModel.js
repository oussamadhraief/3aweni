const mongoose = require("mongoose");
const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 8,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  socketId: {
    type: String,
  },
});

module.exports = mongoose.model("User", user);
