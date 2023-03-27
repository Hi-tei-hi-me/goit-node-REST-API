const express = require("express");

const { contacts: ctrl } = require("../../controllers");
const { bodyValidation, idValidation, authentication } = require("../../middlewares");
const {
  schema: { joiContactSchema, joiUpdateSchema },
} = require("../../models/contact");

const router = express.Router();

router.get("/", authentication, ctrl.getAllContacts);

router.get("/:contactId", authentication, idValidation, ctrl.getContactById);

router.post("/", authentication, bodyValidation(joiContactSchema, "Missing required field data"), ctrl.addContact);

router.delete("/:contactId", authentication, idValidation, ctrl.deleteContactById);

router.put(
  "/:contactId",
  authentication,
  idValidation,
  bodyValidation(joiContactSchema, "Missing required field data"),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  authentication,
  idValidation,
  bodyValidation(joiUpdateSchema, "Missing Favorite field"),
  ctrl.updateContactStatus
);

module.exports = router;
