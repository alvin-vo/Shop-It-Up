/*
    All the routes need to handle is what to do with the request and response and what managers to call. 
    They will only communicate with the the req and res object, and managers interfaces.
*/

const express = require("express");
const passport = require("passport");
const { authorize } = require("../Managers/authorize_manager");

const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile", "openid"] })
);

router.get("/authorizeTest", authorize, (req, res) => {
  const id = req.userId;
  res.status(200).send(`This is your id: ${id} `);
});

module.exports = router;
