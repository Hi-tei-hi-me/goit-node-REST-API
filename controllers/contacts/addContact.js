const { Contact } = require("../../models/contact.js");

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const addedContact = await Contact.create({ ...req.body, owner });
  res.status(201).json({
    status: "success",
    code: 201,
    message: "Contact added",
    data: {
      addedContact,
    },
  });
};

module.exports = addContact;
