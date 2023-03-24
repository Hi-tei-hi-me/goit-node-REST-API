const contactsActions = require("../../models/contacts");

<<<<<<< Updated upstream
const addContact = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
=======
const addContact = async (req, res) => {
  const addedContact = await contactsActions.addContact({ name, email, phone });
  res.json({
    status: "success",
    code: 201,
    message: "Contact added",
    data: {
      addedContact,
    },
  });
>>>>>>> Stashed changes
};

module.exports = addContact;
