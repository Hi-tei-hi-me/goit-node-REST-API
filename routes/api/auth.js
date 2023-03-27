const express = require("express");

const { users: ctrl } = require("../../controllers");
const { bodyValidation, authentication, upload } = require("../../middlewares");
const {
  schema: { joiSignUpSchema, joiSignInSchema, joiSubscriptionSchema, joiEmailSchema },
} = require("../../models/user");

const router = express.Router();

router.post("/register", bodyValidation(joiSignUpSchema), ctrl.signUpUser);

router.get("/verify/:verificationToken", ctrl.verifyUserEmail);

router.post("/verify", bodyValidation(joiEmailSchema), ctrl.resendUserEmailVerification);

router.post("/login", bodyValidation(joiSignInSchema), ctrl.signInUser);

router.get("/current", authentication, ctrl.getCurrentUser);

router.post("/logout", authentication, ctrl.logOutUser);

router.patch("/", authentication, bodyValidation(joiSubscriptionSchema), ctrl.updateUserSubscription);

router.patch("/avatars", authentication, upload.single("avatar"), ctrl.updateUserAvatar);

module.exports = router;
