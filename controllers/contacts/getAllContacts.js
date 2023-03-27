const { Contact } = require("../../models/contact.js");

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 15, favorite } = req.query;
  const skip = (page - 1) * limit;
  let allContacts;
  if (favorite) {
    allContacts = await Contact.find({ owner, favorite }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id email subscription");
  } else {
    allContacts = await Contact.find({ owner }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id email subscription");
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result: allContacts,
    },
  });
};

module.exports = getAllContacts;
