const contactsActions = require("../../models/contacts");

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
};

module.exports = addContact;
