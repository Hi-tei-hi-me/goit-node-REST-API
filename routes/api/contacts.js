const express = require("express");

const contactsActions = require("../../models/contacts");
const { HttpError } = require("../../utils");
const { contactSchema } = require("../../schemas");

const router = express.Router();

router.get("/", async (req, res, next) => {
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
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const oneContact = await contactsActions.getById(contactId);
    if (!oneContact) {
      throw HttpError(404, "Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        oneContact,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }
    const addedContact = await contactsActions.addContact({ name, email, phone });
    res.json({
      status: "success",
      code: 201,
      message: "Contact added",
      data: {
        addedContact,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await contactsActions.removeContact(contactId);
    if (!deletedContact) {
      throw HttpError(404, "Not found");
    }
    res.json({
      status: "success",
      code: 200,
      message: "Contact deleted",
    });
  } catch (error) {
    next(err);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }
    const { contactId } = req.params;
    const updatedContact = await contactsActions.updateContact(contactId, req.body);
    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }
    res.json({
      status: "success",
      code: 200,
      message: "Contact updated",
      data: {
        updatedContact,
      },
    });
  } catch (error) {
    next(err);
  }
});

module.exports = router;
