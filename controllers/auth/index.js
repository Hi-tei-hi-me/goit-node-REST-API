const ctrlWrapper = require("../../utils/ctrlWrapper");
const signUpUser = require("./signUpUser");
const signInUser = require("./signInUser");
const getCurrentUser = require("./getCurrentUser");
const logOutUser = require("./logOutUser");
const updateUserSubscription = require("./updateUserSubscription");

module.exports = {
  signUpUser: ctrlWrapper(signUpUser),
  signInUser: ctrlWrapper(signInUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  logOutUser: ctrlWrapper(logOutUser),
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
};
