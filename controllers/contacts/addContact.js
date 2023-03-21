const contactsActions = require("../../models/contacts");
const { HttpError } = require("../../utils");
const { contactSchema } = require("../../schemas");

const addContact = async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw HttpError(404, error.message);
  }
  const addedContact = await contactsActions.addContact({ name, email, phone });
  res.json({
    status: "success",
    code: 201,
    message: "Contact added",
    data: {
      addedContact,
    },
  });
};

module.exports = addContact;
