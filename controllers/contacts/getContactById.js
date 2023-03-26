const { Contact } = require("../../models/contact.js");
const { HttpError } = require("../../utils");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const oneContact = await Contact.findById(contactId);
  if (!oneContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      oneContact,
    },
  });
};

module.exports = getContactById;
