const contactsActions = require("../../models/contacts");
const { HttpError } = require("../../utils");

<<<<<<< Updated upstream
const updateContactById = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }
    const { contactId } = req.params;
    const updatedContact = await contactsActions.updateContact(contactId, req.body);
    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }
    res.json({
      status: "success",
      code: 200,
      message: "Contact updated",
      data: {
        updatedContact,
      },
    });
  } catch (error) {
    next(err);
  }
=======
const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await contactsActions.updateContact(contactId, req.body);
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    message: "Contact updated",
    data: {
      updatedContact,
    },
  });
>>>>>>> Stashed changes
};

module.exports = updateContactById;
