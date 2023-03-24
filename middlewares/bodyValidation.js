const { HttpError } = require("../utils");

const bodyValidation = (contactSchema) => {
  return (req, res, next) => {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
};

module.exports = bodyValidation;
