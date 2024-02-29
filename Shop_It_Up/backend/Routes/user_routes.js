const express = require("express");
/*
    All the routes need to handle is what to do with the request and response and what managers to call. 
    They will only communicate with the the req and res object, and managers interfaces.
*/

const router = express.Router();
const userManager = require("../Managers/user_manager.js");

// USER:

//Create user account
router.post("/create", async (req, res) => {
  const user = await userManager.createUser(req.body);
  if (user == null) {
    res.status(400).json({ errorMsg: " Failed to create user account." });
  } else {
    res.status(201).json(user);
  }
});

//Get user Info
router.get("/getInfo", async (req, res) => {
  res.status(200).json("Under Developement: Getting user information."); // Sending a message for user information retrieval
});

//Get all user
router.get("/getAll", async (req, res) => {
  const users = await userManager.getAllUsers(
    req.body.password,
    req.body.passphrase
  );
  if (users == null) {
    res.status(400).json({ errorMsg: " Failed to retrieve all users." });
  } else {
    res.status(200).json(users);
  }
});

// PRODUCTS:

//Add product to sell
router.post("/addProduct", async (req, res) => {
  res.status(200).json("Under Development: Adding product to sell."); // Sending a message for adding product
});

//Remove product to sell
router.delete("/removeProduct", async (req, res) => {
  res.status(200).json("Under Development: Removing product to sell."); // Sending a message for removing product
});

// INVITES:

//Send Invite
router.post("/invite/:userId", async (req, res) => {
  const user = await userManager.sendInvite(req.params.userId);
  if (user == false) {
    res.status(400).json({ errorMsg: " Failed to send invite email." });
  } else {
    res.status(200).json("Success: Email sent for invitation.");
  }
});

//Accept Invite
router.post("/invite/accept/:cartId", async (req, res) => {
  const user = await userManager.acceptInvite(req.params.cartId);
  if (user == null) {
    res.status(400).json({ errorMsg: " Failed to accept invitation." });
  } else {
    res.status(200).json(user);
  }
});

module.exports = router;
