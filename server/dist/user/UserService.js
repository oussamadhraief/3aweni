const mongoose = require("mongoose");
const Donation = require("../donation/DonationModel");
const Fundraiser = require("../fundraiser/FundraiserModel");
const User = require("./UserModel");
const bcrypt = require("bcryptjs");
const register = async (email, password, name, phone, socketId) => {
  try {
    const user = await User.findOne({
      email
    });
    if (user) throw new Error("User already exists");
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      name,
      phone,
      image: "",
      password: hashedPassword,
      socketId: ""
    });
    await newUser.save();
    return newUser;
  } catch (error) {
    console.log(error);
  }
};
const fetchUserTotalDonations = async id => {
  const totalDonations = await Donation.find({
    recipientId: id
  }).count();
  return totalDonations;
};
const fetchUserTotalFundraisers = async id => {
  const totalFundraisers = await Fundraiser.find({
    user: id
  }).count();
  return totalFundraisers;
};
const fetchUserTotalMoneySent = async id => {
  const totalMoneySent = await Donation.aggregate([{
    $match: {
      user: mongoose.Types.ObjectId(id)
    }
  }, {
    $group: {
      _id: null,
      totalAmount: {
        $sum: "$amount"
      }
    }
  }]);
  return totalMoneySent.length > 0 ? totalMoneySent[0].totalAmount : 0;
};
const fetchUserTotalMoneyReceived = async id => {
  const totalMoneyReceived = await Fundraiser.aggregate([{
    $match: {
      user: mongoose.Types.ObjectId(id)
    }
  }, {
    $lookup: {
      from: "donations",
      let: {
        fundraiserId: "$_id"
      },
      pipeline: [{
        $match: {
          $expr: {
            $eq: ["$fundraiser", "$$fundraiserId"]
          }
        }
      }, {
        $group: {
          _id: null,
          totalAmount: {
            $sum: "$amount"
          }
        }
      }],
      as: "donations"
    }
  }, {
    $project: {
      totalAmount: {
        $arrayElemAt: ["$donations.totalAmount", 0]
      }
    }
  }, {
    $match: {
      totalAmount: {
        $ne: null,
        $ne: undefined
      }
    }
  }]);
  return totalMoneyReceived.length > 0 ? totalMoneyReceived.map(donation => donation.totalAmount) // Extract the amount attribute
  .reduce((sum, amount) => sum + amount, 0) : 0;
};
exports.register = register;
exports.fetchUserTotalDonations = fetchUserTotalDonations;
exports.fetchUserTotalFundraisers = fetchUserTotalFundraisers;
exports.fetchUserTotalMoneySent = fetchUserTotalMoneySent;
exports.fetchUserTotalMoneyReceived = fetchUserTotalMoneyReceived;