const Fundraiser = require("./FundraiserModel");
const Donation = require("../donation/DonationModel");
const mongoose = require("mongoose");
const createFundraiser = async (uid, category, state, zipCode, type, title, goal) => {
  try {
    const newFundraiser = await Fundraiser.create({
      user: uid,
      category: category,
      state: state,
      zipCode: parseInt(zipCode),
      type: type,
      goal: goal,
      archived: false,
      title: title,
      image: null,
      description: null,
      secondaryImages: [],
      secondaryVideos: []
    });
    return newFundraiser;
  } catch (error) {
    console.log(error);
  }
};
const fetchFundraiser = async id => {
  const fundraiser = await Fundraiser.findOne({
    _id: id
  }).populate("user");
  return fundraiser;
};
const fetchFundraiserCollectedAmount = async id => {
  try {
    const collectedAmount = await Donation.aggregate([{
      $match: {
        fundraiser: mongoose.Types.ObjectId(id)
      }
    }, {
      $group: {
        _id: null,
        amount: {
          $sum: "$amount"
        }
      }
    }]);
    return collectedAmount.length > 0 ? collectedAmount[0].amount : 0;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const fetchFundraiserTotalDonations = async id => {
  const totalDonations = await Donation.find({
    fundraiser: id
  }).count();
  return totalDonations;
};
const fetchFundraiserTopDonation = async id => {
  const topDonation = await Donation.findOne({
    fundraiser: id
  }, {}, {
    sort: {
      amount: -1
    }
  }).populate("user");
  return topDonation;
};
const fetchFundraiserMostRecentDonation = async id => {
  const mostRecentDonation = await Donation.findOne({
    fundraiser: id
  }, {}, {
    sort: {
      createdAt: -1
    }
  }).populate("user");
  return mostRecentDonation;
};
const fetchFundraiserFirstDonation = async id => {
  const firstDonation = await Donation.findOne({
    fundraiser: id
  }, {}, {
    sort: {
      createdAt: 1
    }
  }).populate("user");
  return firstDonation;
};
const fetchMoneyReceivedByDate = async (startDate, endDate, id) => {
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
            $and: [{
              $eq: ["$fundraiser", "$$fundraiserId"]
            }, {
              $gte: ["$createdAt", startDate]
            }, {
              $lt: ["$createdAt", endDate]
            }]
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
exports.createFundraiser = createFundraiser;
exports.fetchFundraiser = fetchFundraiser;
exports.fetchFundraiserCollectedAmount = fetchFundraiserCollectedAmount;
exports.fetchFundraiserTotalDonations = fetchFundraiserTotalDonations;
exports.fetchFundraiserTopDonation = fetchFundraiserTopDonation;
exports.fetchFundraiserMostRecentDonation = fetchFundraiserMostRecentDonation;
exports.fetchFundraiserFirstDonation = fetchFundraiserFirstDonation;
exports.fetchMoneyReceivedByDate = fetchMoneyReceivedByDate;