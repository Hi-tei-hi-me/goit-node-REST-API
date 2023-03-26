const express = require("express");

const { contacts: ctrl } = require("../../controllers");
const { bodyValidation } = require("../../middlewares");
const schemas = require("../../schemas");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", bodyValidation(schemas.contactSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.deleteContactById);

router.put("/:contactId", bodyValidation(schemas.contactSchema), ctrl.updateContactById);

router.patch("/:contactId/favorite", ctrl.updateContactStatus);

module.exports = router;
