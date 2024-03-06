const express = require("express");
/*
    All the routes need to handle is what to do with the request and response and what managers to call. 
    They will only communicate with the the req and res object, and managers interfaces.
*/

const router = express.Router();
const userManager = require("../Managers/user_manager.js");
const { authorize } = require("../Managers/authorize_manager");

// USER:

//Create user account
router.post("/create", async (req, res) => {
  const user = await userManager.createUser(req.body);
  if (user == null) {
    res.send("Error: null.");
  } else {
    res.send(user);
  }
});

//Get user Info
router.get("/getInfo/:userId", async (req, res) => {
  if(!Object.keys(req.body).length) {
    res.send("Error: null.");
  } else {
    const user = await userManager.getUser(req.params.userId, req.body.password, req.body.passphrase);
    if (user == null) {
      res.send("Error: null.");
    } else {
      res.send(user);
    }
  }
});

//Get all user
router.get("/getAll/", async (req, res) => {
  if(!Object.keys(req.body).length) {
    res.send("Error: null.");
  } else {
    const users = await userManager.getAll(req.body.password, req.body.passphrase);
    if (users == null) {
      res.send("Error: null.");
    } else {
      res.send(users);
    }
  }
});

// PRODUCTS:

//Add product to sell
router.post("/addProduct/:productId", authorize, async (req, res) => {
  const userId = req.userId;
  if(userId == undefined) {
    res.send("Error: invalid user.");
  } else {
    const user = await userManager.addProductToSell(userId, req.params.productId, req.body);
    if (user == false) {
      res.send("Error: product not added.");
    } else {
      res.send("Passed: product added.");
    }
  }
});

//Remove product to sell
router.delete("/removeProduct/:productId", authorize, async (req, res) => {
  const userId = req.userId;
  if(userId == undefined) {
    res.send("Error: invalid user.");
  } else {
    const user = await userManager.removeProductToSell(userId, req.params.productId);
    if (user == false) {
      res.send("Error: product not removed.");
    } else {
      res.send("Passed: product removed.");
    }
  }
});

// INVITES:

//Send Invite
router.post("/invite/:email", authorize, async (req, res) => {
  const userId = req.userId;
  if(userId == undefined) {
    res.send("Error: invalid user.");
  } else {
    const user = await userManager.sendInvite(userId, req.params.email);
    if (user == false) {
      res.send("Error: email not sent.");
    } else {
      res.send(user);
    }
  }
});

//Accept Invite
router.post("/invite/accept/:cartId", authorize, async (req, res) => {
  const userId = req.userId;
  if(userId == undefined) {
    res.send("Error: invalid user.");
  } else {
    const user = await userManager.acceptInvite(req.params.cartId, userId);
    if (user == null) {
      res.send("Error: null.");
    } else {
      res.send(user);
    }
  }
});

module.exports = router;
