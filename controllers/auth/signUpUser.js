const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models/user");
const { RequestError, sendEmail } = require("../../utils");

const { BASE_URL } = process.env;

const signUpUser = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "E-mail is already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  await User.create({
    ...req.body,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });
  const emailVerification = {
    to: email,
    subject: "E-mail verification",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click here to verify your e-mail</a>`,
  };
  await sendEmail(emailVerification);
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
