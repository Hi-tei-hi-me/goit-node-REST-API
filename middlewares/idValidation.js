const { isValidObjectId } = require("mongoose");
const { RequestError } = require("../utils");

const idValidation = (req, res, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);
  if (!isCorrectId) {
    const error = RequestError(400, `${contactId} is not correct id format`);
    next(error);
  }
  next();
};

module.exports = idValidation;
