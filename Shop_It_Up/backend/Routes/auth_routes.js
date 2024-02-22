/*
    All the routes need to handle is what to do with the request and response and what managers to call. 
    They will only communicate with the the req and res object, and managers interfaces.
*/

const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile", "openid"] })
);

module.exports = router;