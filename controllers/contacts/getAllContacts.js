const contactsActions = require("../../models/contacts");

const getAllContacts = async (req, res) => {
  const allContacts = await contactsActions.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result: allContacts,
    },
  });
};

module.exports = getAllContacts;
