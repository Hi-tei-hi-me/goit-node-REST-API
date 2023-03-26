const { Contact } = require("../../models/contact.js");

const updateContactStatus = async (req, res) => {
  const { contactId } = req.params;
  const contactStatus = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contactStatus) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateContactStatus;
