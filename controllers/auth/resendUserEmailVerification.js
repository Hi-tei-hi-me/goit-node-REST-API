const { User } = require("../../models/user");
const { RequestError, sendEmail } = require("../../utils");

const { BASE_URL } = process.env;

const resendUserEmailVerification = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "E-mail not found");
  }
  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }
  const emailVerification = {
    to: email,
    subject: "E-mail verification",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click here to verify your e-mail</a>`,
  };
  await sendEmail(emailVerification);
  res.status(200).json({
    message: "Verification e-mail was send successfully",
  });
};

module.exports = resendUserEmailVerification;
