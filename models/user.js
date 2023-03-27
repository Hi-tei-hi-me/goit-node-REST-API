const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationErrors } = require("../utils");

const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailPattern,
      unique: true,
      required: [true, "E-mail is required"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

userSchema.post("save", handleSchemaValidationErrors);

const joiSignUpSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailPattern).required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

const joiSignInSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailPattern).required(),
});

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schema = {
  joiSignUpSchema,
  joiSignInSchema,
  joiSubscriptionSchema,
};

module.exports = { User, schema };
