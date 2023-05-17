const mongoose = require("mongoose");

const Fundraiser = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['animals', 'education', 'environment', 'event', 'family', 'funerals', 'religion', 'health', 'sports', 'emergencies', 'other'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    required: true,
  },
  state: {
    type: String,
    required: true,
    enum: [
    "Ariana", 
    "Beja", 
    "BenArous", 
    "Bizerte", 
    "Gabes", 
    "Gafsa", 
    "Jendouba",
    "Kairouan", 
    "Kasserine",
    "Kebili", 
    "LeKef", 
    "Mahdia", 
    "Manouba", 
    "Medenine", 
    "Monastir", 
    "Nabeul", 
    "Sfax", 
    "SidiBouzid", 
    "Siliana", 
    "Sousse", 
    "Tataouine",
    "Tozeur", 
    "Tunis", 
    "Zaghouan", 
    ]
  },
  zipCode: { 
      type: Number,
      trim: true,
      required: true,
    }, 
  type: { 
      type: String,
      required: true,
      enum: [
        "Forme",
        "Forsomeone"
      ]
  }, 
  goal: {
    type: Number,
    required: true,
    minlength: 1000000,
    maxlength: 50
  },
  description: {
    type: String,
    default: null
  },
  image: {
    type: String,
  },
  title: {
    type: String,
    minlength: 4,
    maxlength: 150
  },
  archived: {
    type: Boolean,
    required: true,
    default: false
  },
  secondaryImages: {
    type: [String],
  },
  secondaryVideos: {
    type: [String],
  }
},
{ timestamps: true });

module.exports = mongoose.model("Fundraiser", Fundraiser);