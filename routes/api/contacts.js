const express = require("express");
const router = express.Router();

const contactsActions = require("../../models/contacts");
const { HttpError } = require("../../utils");

router.get("/", async (req, res, next) => {
  const allContacts = await contactsActions.listContacts();
  res.json(allContacts);
});

router.get("/:contactId", async (req, res, next) => {
  const oneContact = await contactsActions.getContactById(id);
  res.json(oneContact);
});

router.post("/", async (req, res, next) => {
  const addedContact = await contactsActions.addContact({ name, email, phone });
  res.json(addedContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const deletedContact = await contactsActions.removeContact(id);
  res.json(deletedContact);
});

router.put("/:contactId", async (req, res, next) => {
  const updatedContact = await contactsActions.updateContact(id, { name, email, phone });
  res.json(updatedContact);
});

module.exports = router;
