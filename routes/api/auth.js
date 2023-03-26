const express = require("express");

const { users: ctrl } = require("../../controllers");
const { bodyValidation, authentication } = require("../../middlewares");
const {
  schema: { joiSignUpSchema, joiSignInSchema, joiSubscriptionSchema },
} = require("../../models/user");

const router = express.Router();

router.post("/register", bodyValidation(joiSignUpSchema), ctrl.signUpUser);

router.post("/login", bodyValidation(joiSignInSchema), ctrl.signInUser);

router.get("/current", authentication, ctrl.getCurrentUser);

router.post("/logout", authentication, ctrl.logOutUser);

router.patch("/", authentication, bodyValidation(joiSubscriptionSchema), ctrl.updateUserSubscription);

module.exports = router;