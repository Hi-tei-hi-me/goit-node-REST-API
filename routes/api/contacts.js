const express = require("express");

const { contacts: ctrl } = require("../../controllers");
const { bodyValidation, idValidation } = require("../../middlewares");
const {
  schema: { joiContactSchema, joiUpdateSchema },
} = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", idValidation, ctrl.getContactById);

router.post("/", bodyValidation(joiContactSchema, "Missing required field data"), ctrl.addContact);

router.delete("/:contactId", idValidation, ctrl.deleteContactById);

router.put(
  "/:contactId",
  idValidation,
  bodyValidation(joiContactSchema, "Missing required field data"),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  idValidation,
  bodyValidation(joiUpdateSchema, "Missing Favorite field"),
  ctrl.updateContactStatus
);

module.exports = router;
