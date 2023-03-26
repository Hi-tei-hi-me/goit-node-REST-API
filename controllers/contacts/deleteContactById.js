const { Contact } = require("../../models/contact.js");
const { HttpError } = require("../../utils");

const deleteContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await Contact.findByIdAndRemove(contactId);
    if (!deletedContact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Contact deleted",
    });
  } catch (error) {
    next(err);
  }
};

module.exports = deleteContactById;
