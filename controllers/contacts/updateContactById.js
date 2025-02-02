const { Contact } = require("../../models/contact.js");
const { RequestError } = require("../../utils");

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contact updated",
    data: {
      updatedContact,
    },
  });
};

module.exports = updateContactById;
