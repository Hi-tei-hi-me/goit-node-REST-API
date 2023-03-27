const bcrypt = require("bcryptjs");

const { User } = require("../../models/user");
const { RequestError } = require("../../utils");

const signUpUser = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "E-mail is already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  await User.create({ ...req.body, password: hashPassword, subscription });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = signUpUser;
