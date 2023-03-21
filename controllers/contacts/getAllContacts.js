const contactsActions = require("../../models/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const allContacts = await contactsActions.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: allContacts,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getAllContacts;
