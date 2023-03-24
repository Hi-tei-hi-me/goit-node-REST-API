const ctrlWrapper = (ctrl) => {
  return async (res, req, next) => {
    try {
      await ctrl(res, req, next);
    } catch (err) {
      next(err);
    }
  };
};

module.exports = ctrlWrapper;
