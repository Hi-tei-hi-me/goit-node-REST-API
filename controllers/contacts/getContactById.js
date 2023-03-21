const contactsActions = require("../../models/contacts");
const { HttpError } = require("../../utils");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const oneContact = await contactsActions.getById(contactId);
  if (!oneContact) {
    throw HttpError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      oneContact,
    },
  });
};

module.exports = getContactById;
