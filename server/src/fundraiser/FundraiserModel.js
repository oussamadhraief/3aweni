const mongoose = require("mongoose");

const Fundraiser = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: [
      "Animaux",
      "Bénévolat",
      "Communauté",
      "Compétition",
      "Créativité",
      "Dépensescourantes",
      "Éducation",
      "Entreprises",
      "Environnement",
      "Événements",
      "Famille",
      "Obsèquesetcommémorations",
      "PotscommunsdAnniversaire",
      "Religion",
      "Rêves",
      "Santé",
      "Sports",
      "Urgences",
      "Voyages",
      "Autre"
    ],
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
      type: String,
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
    min: 100,
    max: 1000000
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
  }
},
{ timestamps: true });

module.exports = mongoose.model("Fundraiser", Fundraiser);