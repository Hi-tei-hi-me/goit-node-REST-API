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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

const joiContactSchema = Joi.object({
  name: Joi.string().min(3).max(25).required(),
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
  joiContactSchema,
  joiUpdateSchema,
};

module.exports = { Contact, schema };
