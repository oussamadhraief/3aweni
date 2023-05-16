const mongoose = require('mongoose');

const ContactUser = new mongoose.Schema({
  senderId: 
    {
     type: mongoose.Schema.Types.ObjectId, ref: 'User',
     required: false
    },
  recipientId: 
  { 
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
},
{ timestamps: true });

module.exports = mongoose.model("ContactUser", ContactUser);