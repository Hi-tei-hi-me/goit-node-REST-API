const { User } = require("../../models/user");

const updateUserSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const userSubscription = await User.findByIdAndUpdate(_id, { subscription }, { new: true });
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      userSubscription,
    },
  });
};

module.exports = updateUserSubscription;
