const mongoose = require('mongoose');

const donation = new mongoose.Schema({
  user: 
  {
     type: mongoose.Schema.Types.ObjectId, ref: 'User',
     required: true 
    },
  fundraiser: 
  { 
    type: mongoose.Schema.Types.ObjectId, ref: 'Fundraiser',
    required: true 
},
amount: {
  type: Number,
  required: true,
  minlength: 1000000,
  maxlength: 50
},
},
{ timestamps: true });

module.exports = mongoose.model("Donation", donation);