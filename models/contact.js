const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationErrors } = require("../utils");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiAddSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(25)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string()
    .pattern(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/)
    .required(),
  favorite: Joi.boolean(),
});

const joiUpdateSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

contactSchema.post("save", handleSchemaValidationErrors);

const schema = {
  joiAddSchema,
  joiUpdateSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schema };
