const { HttpError } = require("../utils");

const bodyValidation = (schema, message) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, (error.message = message || error.details[0].message)));
    }
    next();
  };
};

module.exports = bodyValidation;
