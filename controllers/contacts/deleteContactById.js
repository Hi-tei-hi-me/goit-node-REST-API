const contactsActions = require("../../models/contacts");
const { HttpError } = require("../../utils");

const deleteContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await contactsActions.removeContact(contactId);
    if (!deletedContact) {
      throw HttpError(404, "Not found");
    }
    res.json({
      status: "success",
      code: 200,
      message: "Contact deleted",
    });
  } catch (error) {
    next(err);
  }
};

module.exports = deleteContactById;
