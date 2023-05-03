const mongoose = require('mongoose');

const donation = new mongoose.Schema({
  senderId: 
  {
     type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    },
  recipientId: 
  { 
    type: mongoose.Schema.Types.ObjectId, ref: 'User' 
},
  amount: Number,
});

module.exports = mongoose.model("Donation", donation);