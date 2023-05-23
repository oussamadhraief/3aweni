const Fundraiser = require("./FundraiserModel");
const Donation = require("../donation/DonationModel");
const mongoose = require("mongoose");

const createFundraiser = async (
  uid,
  category,
  state,
  zipCode,
  type,
  title,
  goal
) => {
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
      secondaryVideos: [],
    });

    return newFundraiser;
  } catch (error) {
    console.log(error);
  }
};

const fetchFundraiser = async (id) => {
  const fundraiser = await Fundraiser.findOne({ _id: id }).populate("user");

  return fundraiser;
};

const fetchFundraiserCollectedAmount = async (id) => {
  try {
    const collectedAmount = await Donation.aggregate([
      {
        $match: {
          fundraiser: mongoose.Types.ObjectId(id),
        },
      },
      {
        $group: {
          _id: null,
          amount: { $sum: "$amount" },
        },
      },
    ]);

    return collectedAmount.length > 0 ? collectedAmount[0].amount : 0;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchFundraiserTotalDonations = async (id) => {
  const totalDonations = await Donation.find({ fundraiser: id }).count();

  return totalDonations;
};

const fetchFundraiserTopDonation = async (id) => {
  const topDonation = await Donation.findOne(
    { fundraiser: id },
    {},
    { sort: { amount: -1 } }
  ).populate("user");

  return topDonation;
};

const fetchFundraiserMostRecentDonation = async (id) => {
  const mostRecentDonation = await Donation.findOne(
    { fundraiser: id },
    {},
    { sort: { createdAt: -1 } }
  ).populate("user");

  return mostRecentDonation;
};

const fetchFundraiserFirstDonation = async (id) => {
  const firstDonation = await Donation.findOne(
    { fundraiser: id },
    {},
    { sort: { createdAt: 1 } }
  ).populate("user");

  return firstDonation;
};

const fetchFundraisersCreatedCountByDate = async (startDate, endDate) => {
  const count = Fundraiser.find({
    createdAt: {
      $gte: startDate,
      $lt: endDate,
    },
  }).count();

  return count;
};

const fetchFundraiserWordsOfSupport = async (id) => {

  const donations = await Donation.find({ fundraiser: id, message: { $ne: "" }, incognito: false })
      .sort({ amount: -1 })
      .limit(10).populate("user")

  return donations;
};

exports.createFundraiser = createFundraiser;
exports.fetchFundraiser = fetchFundraiser;
exports.fetchFundraiserCollectedAmount = fetchFundraiserCollectedAmount;
exports.fetchFundraiserTotalDonations = fetchFundraiserTotalDonations;
exports.fetchFundraiserTopDonation = fetchFundraiserTopDonation;
exports.fetchFundraiserMostRecentDonation = fetchFundraiserMostRecentDonation;
exports.fetchFundraiserFirstDonation = fetchFundraiserFirstDonation;
exports.fetchFundraisersCreatedCountByDate = fetchFundraisersCreatedCountByDate;
exports.fetchFundraiserWordsOfSupport = fetchFundraiserWordsOfSupport;
