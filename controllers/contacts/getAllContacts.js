const { Contact } = require("../../models/contact.js");

const getAllContacts = async (req, res, next) => {
  try {
    const allContacts = await Contact.find({}, "-createdAt -updatedAt");
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result: allContacts,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getAllContacts;
